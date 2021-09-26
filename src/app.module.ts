import { Module } from '@nestjs/common';
import { CheckoutController } from './Checkout/checkout.controller';
import { CheckoutApplication } from './Checkout/checkout.application';
import { AppController } from './app.controller';
import { DiscountsService } from './Discounts/discounts.service';
import { ProductsService } from './Products/products.service';
@Module({
  controllers: [AppController, CheckoutController],
  providers: [ProductsService, DiscountsService, CheckoutApplication],
})
export class AppModule {}
