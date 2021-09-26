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

@Injectable()
export class CheckoutApplication {
  constructor(
    private readonly productsService: ProductsService,
    private readonly discountsService: DiscountsService,
  ) {}

  async createCart(createCart: CreateCartDtoRequest) {
    const productsPromises = createCart.products.map((product) =>
      this.getProduct(product),
    );
    const products = await Promise.all(productsPromises);
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

  private async getProduct(productCart: ProductCartDto) {
    const product = this.productsService.findById(productCart.id);
    const { percentage } = await this.discountsService.get(productCart.id);

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
