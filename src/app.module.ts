import { Module } from '@nestjs/common';
import { CheckoutController } from './Checkout/checkout.controller';
import { CheckoutApplication } from './Checkout/checkout.application';
import { AppController } from './app.controller';
import { DiscountsService } from './Discounts/discounts.service';
import { ProductsService } from './Products/products.service';
import { ConfigModule } from '@nestjs/config';
import { ClientGRPC } from './shared/client-grpc';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController, CheckoutController],
  providers: [
    ProductsService,
    DiscountsService,
    CheckoutApplication,
    ClientGRPC,
  ],
})
export class AppModule {}
