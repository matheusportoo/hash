import { Injectable } from '@nestjs/common';
import ProductsMock from './products.mock.json';
import { Product } from './products.interface';
import { NotFoundException } from '../shared/ExceptionHandler/notFound.exception';

@Injectable()
export class ProductsService {
  private products: Product[] = ProductsMock;

  findAll(): Product[] {
    return this.products;
  }

  findById(id: number): Product {
    const product = this.products.find((product) => product.id === id);

    if (!product) {
      throw new NotFoundException();
    }

    return product;
  }
}
