import { Test } from '@nestjs/testing';

import { CheckoutController } from './checkout.controller';
import { CheckoutApplication } from './checkout.application';
import { DiscountsService } from '../Discounts/discounts.service';
import { ProductsService } from '../Products/products.service';
import { BlackFridayService } from '../BlackFriday/black-friday.service';
import { ClientGRPC } from '../shared/client-grpc';
import { Currency } from '../shared/currency';

describe('CheckoutController', () => {
  let checkoutController: CheckoutController;
  let checkoutApplication: CheckoutApplication;
  let discountsService: DiscountsService;
  let productsService: ProductsService;
  let blackFridayService: BlackFridayService;
  let clientGRPC: ClientGRPC;
  let currency: Currency;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [CheckoutController],
      providers: [
        CheckoutApplication,
        DiscountsService,
        ProductsService,
        BlackFridayService,
        ClientGRPC,
        Currency,
      ],
    }).compile();

    checkoutController = moduleRef.get<CheckoutController>(CheckoutController);
    checkoutApplication =
      moduleRef.get<CheckoutApplication>(CheckoutApplication);
    discountsService = moduleRef.get<DiscountsService>(DiscountsService);
    productsService = moduleRef.get<ProductsService>(ProductsService);
    blackFridayService = moduleRef.get<BlackFridayService>(BlackFridayService);
    clientGRPC = moduleRef.get<ClientGRPC>(ClientGRPC);
    currency = moduleRef.get<Currency>(Currency);
  });

  describe('Create cart', () => {
    it('should call checkoutApplication.createCart', async () => {
      const checkoutApplicationMock = jest
        .spyOn(checkoutApplication, 'createCart')
        .mockResolvedValue({
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
          ],
          total_amount: 9067000,
          total_amount_with_discount: 8689435,
          total_discount: 377565,
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
