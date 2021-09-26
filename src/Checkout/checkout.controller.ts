import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Post, Body } from '@nestjs/common';
import { CheckoutApplication } from './checkout.application';
import { CreateCartDtoRequest } from './dto/request/create-cart';
import { CreateCartDtoResponse } from './dto/response/create-cart';

@ApiTags('api')
@Controller()
export class CheckoutController {
  constructor(private readonly checkoutApplication: CheckoutApplication) {}

  @Post('/checkout')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: CreateCartDtoResponse,
  })
  createCart(
    @Body() createCartDtoRequest: CreateCartDtoRequest,
  ): Promise<CreateCartDtoResponse> {
    return this.checkoutApplication.createCart(createCartDtoRequest);
  }
}
