import { Test } from '@nestjs/testing';

import { CheckoutApplication } from './checkout.application';
import { DiscountsService } from '../Discounts/discounts.service';
import { ProductsService } from '../Products/products.service';
import { ClientGRPC } from '../shared/client-grpc';

describe('CheckoutApplication', () => {
  let checkoutApplication: CheckoutApplication;
  let discountsService: DiscountsService;
  let productsService: ProductsService;
  let clientGRPC: ClientGRPC;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        DiscountsService,
        ProductsService,
        CheckoutApplication,
        ClientGRPC,
      ],
    }).compile();

    checkoutApplication =
      moduleRef.get<CheckoutApplication>(CheckoutApplication);
    discountsService = moduleRef.get<DiscountsService>(DiscountsService);
    productsService = moduleRef.get<ProductsService>(ProductsService);
    clientGRPC = moduleRef.get<ClientGRPC>(ClientGRPC);
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
            isGift: false,
            quantity: 2,
            totalAmount: 30314,
            unitAmount: 15157,
          },
          {
            discount: 3017.8,
            id: 3,
            isGift: false,
            quantity: 1,
            totalAmount: 60356,
            unitAmount: 60356,
          },
        ],
        totalAmount: 90670,
        totalAmountWithDiscount: 86894.35,
        totalDiscount: 3775.65,
      });
    });
  });
});
