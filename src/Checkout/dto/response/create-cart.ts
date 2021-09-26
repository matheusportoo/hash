export class CreateCartDtoResponse {
  total_amount: number;
  total_amount_with_discount: number;
  total_discount: number;
  products: ProductDtoResponse[];

  constructor(partial: Partial<CreateCartDtoResponse>) {
    Object.assign(this, partial);
  }
}

export class ProductDtoResponse {
  id: number;
  quantity: number;
  discount: number;
  total_amount: number;
  unit_amount: number;
  is_gift: boolean;

  constructor(partial: Partial<ProductDtoResponse>) {
    Object.assign(this, partial);
  }
}
