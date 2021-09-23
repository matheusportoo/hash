import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ProductsService } from './Products/products.service';

@Module({
  controllers: [AppController],
  providers: [ProductsService],
})
export class AppModule {}
