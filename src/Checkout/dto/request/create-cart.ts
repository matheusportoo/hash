import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  ArrayNotEmpty,
  ValidateNested,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCartDtoRequest {
  @IsArray()
  @IsNotEmpty()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => ProductCartDto)
  products: ProductCartDto[];
}

export class ProductCartDto {
  @IsNumber()
  @Min(1)
  id: number;

  @IsNumber()
  @Min(1)
  quantity: number;
}
