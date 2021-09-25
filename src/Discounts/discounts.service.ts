import { Injectable } from '@nestjs/common';

import { Percentage } from './discount.interface';
import client from '../shared/client-grpc';

@Injectable()
export class DiscountsService {
  private percentage: number;

  async get(productId: number) {
    this.percentage = 0;

    try {
      const { percentage }: Percentage = await this.fetchDiscount(productId);
      this.percentage = Number(percentage.toFixed(2));
    } catch (error) {
      console.log(`## Error: `, error);
    }

    return { percentage: this.percentage };
  }

  fetchDiscount(productId: number): Promise<Percentage> {
    return new Promise((resolve, reject) => {
      client.getDiscount({ productID: productId }, (error, data) => {
        error ? reject(error) : resolve(data);
      });
    });
  }
}
