import { Controller, Get, Param } from '@nestjs/common';
import { DiscountsService } from './Discounts/discounts.service';
import { Product } from './Products/products.interface';
import { ProductsService } from './Products/products.service';

@Controller()
export class AppController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly discountService: DiscountsService,
  ) {}

  @Get('/products')
  getProducts(): Product[] {
    return this.productsService.findAll();
  }

  @Get('/products/:id')
  getProduct(@Param('id') id: number) {
    return this.productsService.findById(Number(id));
  }

  @Get('/products/:id/discount')
  getProductWithDiscount(@Param('id') id: number) {
    return this.discountService.get(Number(id));
  }
}
