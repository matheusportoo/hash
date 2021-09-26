import { Test } from '@nestjs/testing';

import { CheckoutApplication } from './checkout.application';
import { DiscountsService } from '../Discounts/discounts.service';
import { ProductsService } from '../Products/products.service';
import { BlackFridayService } from '../BlackFriday/black-friday.service';
import { ClientGRPC } from '../shared/client-grpc';

describe('CheckoutApplication', () => {
  let checkoutApplication: CheckoutApplication;
  let discountsService: DiscountsService;
  let productsService: ProductsService;
  let clientGRPC: ClientGRPC;
  let blackFridayService: BlackFridayService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        DiscountsService,
        ProductsService,
        CheckoutApplication,
        ClientGRPC,
        BlackFridayService,
      ],
    }).compile();

    checkoutApplication =
      moduleRef.get<CheckoutApplication>(CheckoutApplication);
    discountsService = moduleRef.get<DiscountsService>(DiscountsService);
    productsService = moduleRef.get<ProductsService>(ProductsService);
    clientGRPC = moduleRef.get<ClientGRPC>(ClientGRPC);
    blackFridayService = moduleRef.get<BlackFridayService>(BlackFridayService);
  });

  describe('Create cart', () => {
    it('should create a cart and return an object with all properties', () => {
      jest
        .spyOn(discountsService, 'get')
        .mockResolvedValue({ percentage: 0.05 });

      const response = checkoutApplication.createCart({
        products: [
          {
            id: 1,
            quantity: 2,
          },
          {
            id: 3,
            quantity: 1,
          },
        ],
      });

      expect(response).resolves.toEqual({
        products: [
          {
            discount: 757.85,
            id: 1,
            is_gift: false,
            quantity: 2,
            total_amount: 30314,
            unit_amount: 15157,
          },
          {
            discount: 3017.8,
            id: 3,
            is_gift: false,
            quantity: 1,
            total_amount: 60356,
            unit_amount: 60356,
          },
        ],
        total_amount: 90670,
        total_amount_with_discount: 86894.35,
        total_discount: 3775.65,
      });
    });
  });
});
