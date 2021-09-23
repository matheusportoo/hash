import { Controller, Get, Param } from '@nestjs/common';
import { Product } from './Products/products.interface';
import { ProductsService } from './Products/products.service';

@Controller()
export class AppController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('/products')
  getProducts(): Product[] {
    return this.productsService.findAll();
  }

  @Get('/products/:id')
  getProduct(@Param('id') id: number): Product {
    return this.productsService.findById(Number(id));
  }
}
