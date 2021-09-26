import { ApiProperty } from '@nestjs/swagger';

export class ProductDtoResponse {
  @ApiProperty()
  id: number;
  @ApiProperty()
  quantity: number;
  @ApiProperty()
  discount: number;
  @ApiProperty()
  total_amount: number;
  @ApiProperty()
  unit_amount: number;
  @ApiProperty()
  is_gift: boolean;

  constructor(partial: Partial<ProductDtoResponse>) {
    Object.assign(this, partial);
  }
}
export class CreateCartDtoResponse {
  @ApiProperty()
  total_amount: number;
  @ApiProperty()
  total_amount_with_discount: number;
  @ApiProperty()
  total_discount: number;
  @ApiProperty({
    type: [ProductDtoResponse],
  })
  products: ProductDtoResponse[];

  constructor(partial: Partial<CreateCartDtoResponse>) {
    Object.assign(this, partial);
  }
}
