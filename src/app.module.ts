import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DiscountsService } from './Discounts/discounts.service';
import { ProductsService } from './Products/products.service';

@Module({
  controllers: [AppController],
  providers: [ProductsService, DiscountsService],
})
export class AppModule {}
