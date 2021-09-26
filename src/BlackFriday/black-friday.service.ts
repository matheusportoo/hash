import { Injectable } from '@nestjs/common';
import { ProductDtoResponse } from '../Checkout/dto/response/create-cart';
import { ProductsService } from '../Products/products.service';

@Injectable()
export class BlackFridayService {
  private BLACK_FRIDAY_DATE = process.env.BLACK_FRIDAY_DATE;

  constructor(private readonly productsService: ProductsService) {}

  isBlackFriday() {
    const date = new Date();
    const dateISO = date.toISOString();
    console.log({ black: this.BLACK_FRIDAY_DATE, dateISO });
    return dateISO.includes(this.BLACK_FRIDAY_DATE);
  }

  getProductGift(): ProductDtoResponse {
    const productsGift = this.productsService
      .findAll()
      .filter((product) => product.is_gift);
    const productGift =
      productsGift[
        this.getProductGiftPositionRandom(1, productsGift.length - 1)
      ];

    return new ProductDtoResponse({
      quantity: 1,
      discount: 0,
      id: productGift.id,
      totalAmount: 0,
      unitAmount: 0,
      isGift: productGift.is_gift,
    });
  }

  getProductGiftPositionRandom(min, max): number {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min)) + min;
  }

  updateProducts(products: ProductDtoResponse[]): ProductDtoResponse[] {
    const productGiftPosition = products.findIndex((product) => product.isGift);
    const hasProductGift = productGiftPosition > -1;
    const productGift = this.getProductGift();

    if (hasProductGift) {
      products.splice(productGiftPosition, 1);
    }

    return [...products, productGift];
  }
}
