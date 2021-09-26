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

@Injectable()
export class CheckoutApplication {
  constructor(
    private readonly productsService: ProductsService,
    private readonly discountsService: DiscountsService,
    private readonly blackFridayService: BlackFridayService,
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
      totalAmount,
      totalAmountWithDiscount: totalAmount - totalDiscount,
      totalDiscount,
      products,
    });
  }

  private getTotals(products: ProductDtoResponse[]) {
    return products.reduce(
      (data, product) => {
        data.totalAmount += product.totalAmount;
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
      totalAmount: product.amount * productCart.quantity,
      unitAmount: product.amount,
      isGift: product.is_gift,
    });
  }
}
