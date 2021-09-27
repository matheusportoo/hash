import { Test } from '@nestjs/testing';

import { CheckoutApplication } from './checkout.application';
import { DiscountsService } from '../Discounts/discounts.service';
import { ProductsService } from '../Products/products.service';
import { BlackFridayService } from '../BlackFriday/black-friday.service';
import { ClientGRPC } from '../shared/client-grpc';
import { Currency } from '../shared/currency';

describe('CheckoutApplication', () => {
  let checkoutApplication: CheckoutApplication;
  let discountsService: DiscountsService;
  let productsService: ProductsService;
  let clientGRPC: ClientGRPC;
  let blackFridayService: BlackFridayService;
  let currency: Currency;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        DiscountsService,
        ProductsService,
        CheckoutApplication,
        BlackFridayService,
        ClientGRPC,
        Currency,
      ],
    }).compile();

    checkoutApplication =
      moduleRef.get<CheckoutApplication>(CheckoutApplication);
    discountsService = moduleRef.get<DiscountsService>(DiscountsService);
    productsService = moduleRef.get<ProductsService>(ProductsService);
    blackFridayService = moduleRef.get<BlackFridayService>(BlackFridayService);
    clientGRPC = moduleRef.get<ClientGRPC>(ClientGRPC);
    currency = moduleRef.get<Currency>(Currency);
  });

  describe('Create cart', () => {
    it('should create a cart and return an object with all properties', () => {
      jest.spyOn(blackFridayService, 'isBlackFriday').mockReturnValue(true);
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
            discount: 75785,
            id: 1,
            is_gift: false,
            quantity: 2,
            total_amount: 3031400,
            unit_amount: 1515700,
          },
          {
            discount: 301780,
            id: 3,
            is_gift: false,
            quantity: 1,
            total_amount: 6035600,
            unit_amount: 6035600,
          },
          {
            discount: 0,
            id: 6,
            is_gift: true,
            quantity: 1,
            total_amount: 0,
            unit_amount: 0,
          },
        ],
        total_amount: 9067000,
        total_amount_with_discount: 8689435,
        total_discount: 377565,
      });
    });
  });
});
