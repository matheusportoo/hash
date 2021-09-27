import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CheckoutController } from './Checkout/checkout.controller';
import { CheckoutApplication } from './Checkout/checkout.application';
import { DiscountsService } from './Discounts/discounts.service';
import { ProductsService } from './Products/products.service';
import { BlackFridayService } from './BlackFriday/black-friday.service';
import { ClientGRPC } from './shared/client-grpc';
import { Currency } from './shared/currency';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [CheckoutController],
  providers: [
    ProductsService,
    DiscountsService,
    CheckoutApplication,
    BlackFridayService,
    ClientGRPC,
    Currency,
  ],
})
export class AppModule {}
