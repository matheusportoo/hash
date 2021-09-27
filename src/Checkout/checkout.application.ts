import { Injectable } from '@nestjs/common';
import {
  CreateCartDtoResponse,
  ProductDtoResponse,
} from './dto/response/create-cart';
import { DiscountsService } from '../Discounts/discounts.service';
import { ProductsService } from '../Products/products.service';
import {
  CreateCartDtoRequest,
  ProductCartDto,
} from './dto/request/create-cart';
import { BlackFridayService } from '../BlackFriday/black-friday.service';
import { Currency } from '../shared/currency';

@Injectable()
export class CheckoutApplication {
  constructor(
    private readonly productsService: ProductsService,
    private readonly discountsService: DiscountsService,
    private readonly blackFridayService: BlackFridayService,
    private readonly currency: Currency,
  ) {}

  async createCart(createCart: CreateCartDtoRequest) {
    const productsPromises = createCart.products.map((product) =>
      this.getProduct(product),
    );
    let products = await Promise.all(productsPromises);

    if (this.blackFridayService.isBlackFriday()) {
      products = this.blackFridayService.updateProducts(products);
    }

    const { totalAmount, totalDiscount } = this.getTotals(products);

    return new CreateCartDtoResponse({
      total_amount: this.currency.getValue(totalAmount),
      total_amount_with_discount: this.currency.getValue(
        totalAmount - totalDiscount,
      ),
      total_discount: this.currency.getValue(totalDiscount),
      products: products.map((product) => ({
        ...product,
        discount: this.currency.getValue(product.discount),
        total_amount: this.currency.getValue(product.total_amount),
        unit_amount: this.currency.getValue(product.unit_amount),
      })),
    });
  }

  private getTotals(products: ProductDtoResponse[]) {
    return products.reduce(
      (data, product) => {
        data.totalAmount += product.total_amount;
        data.totalDiscount += product.discount;

        return data;
      },
      {
        totalAmount: 0,
        totalDiscount: 0,
      },
    );
  }

  private async getProduct(
    productCart: ProductCartDto,
    hasApplyDiscount = true,
  ) {
    const product = this.productsService.findById(productCart.id);

    const { percentage } = hasApplyDiscount
      ? await this.discountsService.get(productCart.id)
      : { percentage: 0 };

    return new ProductDtoResponse({
      quantity: productCart.quantity,
      discount: product.amount * percentage,
      id: product.id,
      total_amount: product.amount * productCart.quantity,
      unit_amount: product.amount,
      is_gift: product.is_gift,
    });
  }
}
