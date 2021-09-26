export class CreateCartDtoResponse {
  totalAmount: number;
  totalAmountWithDiscount: number;
  totalDiscount: number;
  products: ProductDtoResponse[];

  constructor(partial: Partial<CreateCartDtoResponse>) {
    Object.assign(this, partial);
  }
}

export class ProductDtoResponse {
  id: number;
  quantity: number;
  discount: number;
  totalAmount: number;
  unitAmount: number;
  isGift: boolean;

  constructor(partial: Partial<ProductDtoResponse>) {
    Object.assign(this, partial);
  }
}
