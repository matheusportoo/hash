import { Test } from '@nestjs/testing';

import { CheckoutController } from './checkout.controller';
import { CheckoutApplication } from './checkout.application';
import { DiscountsService } from '../Discounts/discounts.service';
import { ProductsService } from '../Products/products.service';

describe('CheckoutController', () => {
  let checkoutController: CheckoutController;
  let checkoutApplication: CheckoutApplication;
  let discountsService: DiscountsService;
  let productsService: ProductsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [CheckoutController],
      providers: [CheckoutApplication, DiscountsService, ProductsService],
    }).compile();

    checkoutController = moduleRef.get<CheckoutController>(CheckoutController);
    checkoutApplication =
      moduleRef.get<CheckoutApplication>(CheckoutApplication);
    discountsService = moduleRef.get<DiscountsService>(DiscountsService);
    productsService = moduleRef.get<ProductsService>(ProductsService);
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
