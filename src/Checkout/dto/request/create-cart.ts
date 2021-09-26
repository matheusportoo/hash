import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  ArrayNotEmpty,
  ValidateNested,
  Min,
} from 'class-validator';
import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class ProductCartDto {
  @IsNumber()
  @Min(1)
  @ApiProperty()
  id: number;

  @IsNumber()
  @Min(1)
  @ApiProperty()
  quantity: number;
}

export class CreateCartDtoRequest {
  @IsArray()
  @IsNotEmpty()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => ProductCartDto)
  @ApiProperty({
    type: [ProductCartDto],
  })
  products: ProductCartDto[];
}
