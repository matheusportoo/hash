import { Test } from '@nestjs/testing';

import { CheckoutController } from './checkout.controller';
import { CheckoutApplication } from './checkout.application';
import { DiscountsService } from '../Discounts/discounts.service';
import { ProductsService } from '../Products/products.service';
import { BlackFridayService } from '../BlackFriday/black-friday.service';
import { ClientGRPC } from '../shared/client-grpc';

describe('CheckoutController', () => {
  let checkoutController: CheckoutController;
  let checkoutApplication: CheckoutApplication;
  let discountsService: DiscountsService;
  let productsService: ProductsService;
  let clientGRPC: ClientGRPC;
  let blackFridayService: BlackFridayService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [CheckoutController],
      providers: [
        CheckoutApplication,
        DiscountsService,
        ProductsService,
        ClientGRPC,
        BlackFridayService,
      ],
    }).compile();

    checkoutController = moduleRef.get<CheckoutController>(CheckoutController);
    checkoutApplication =
      moduleRef.get<CheckoutApplication>(CheckoutApplication);
    discountsService = moduleRef.get<DiscountsService>(DiscountsService);
    productsService = moduleRef.get<ProductsService>(ProductsService);
    clientGRPC = moduleRef.get<ClientGRPC>(ClientGRPC);
    blackFridayService = moduleRef.get<BlackFridayService>(BlackFridayService);
  });

  describe('Create cart', () => {
    it('should call checkoutApplication.createCart', async () => {
      const checkoutApplicationMock = jest
        .spyOn(checkoutApplication, 'createCart')
        .mockResolvedValue({
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

      const response = await checkoutController.createCart({
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

      expect(checkoutApplicationMock).toBeCalledTimes(1);
      expect(checkoutApplicationMock).toBeCalledWith({
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
    });
  });
});
