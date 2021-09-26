import { Global } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { BlackFridayService } from '../BlackFriday/black-friday.service';
import { ProductsService } from '../Products/products.service';

describe('BlackFridayService', () => {
  let blackFridayService: BlackFridayService;
  let productsService: ProductsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [BlackFridayService, ProductsService],
    }).compile();

    blackFridayService = moduleRef.get<BlackFridayService>(BlackFridayService);
    productsService = moduleRef.get<ProductsService>(ProductsService);
  });

  describe('isBlackFriday', () => {
    it('should return true when it is black friday', () => {
      const mockDate = new Date('2021-09-27T00:00:00.000Z');

      const dateMock = jest
        .spyOn(global, 'Date')
        .mockImplementation(() => mockDate as any);

      const isBlackFriday = blackFridayService.isBlackFriday();

      expect(isBlackFriday).toBe(true);
    });
  });

  describe('getProductGiftPositionRandom', () => {
    it('should return a product gift position random', () => {
      const position = blackFridayService.getProductGiftPositionRandom(1, 2);

      expect(position).toBeGreaterThan(0);
    });
  });

  describe('updateProducts', () => {
    it('should return a product list updated with product gift', () => {
      jest.spyOn(blackFridayService, 'getProductGift').mockReturnValue({
        id: 1,
        discount: 0,
        isGift: true,
        quantity: 1,
        totalAmount: 0,
        unitAmount: 0,
      });

      const products = blackFridayService.updateProducts([
        {
          id: 1,
          discount: 0,
          isGift: true,
          quantity: 2,
          totalAmount: 20,
          unitAmount: 10,
        },
        {
          id: 2,
          discount: 0,
          isGift: false,
          quantity: 2,
          totalAmount: 40,
          unitAmount: 20,
        },
      ]);

      expect(products).toEqual([
        {
          id: 2,
          discount: 0,
          isGift: false,
          quantity: 2,
          totalAmount: 40,
          unitAmount: 20,
        },
        {
          id: 1,
          discount: 0,
          isGift: true,
          quantity: 1,
          totalAmount: 0,
          unitAmount: 0,
        },
      ]);
    });
  });

  describe('getProductGift', () => {
    it('should return a product gift', () => {
      jest
        .spyOn(blackFridayService, 'getProductGiftPositionRandom')
        .mockReturnValue(0);

      const productGift = blackFridayService.getProductGift();

      expect(productGift).toEqual({
        discount: 0,
        id: 6,
        isGift: true,
        quantity: 1,
        totalAmount: 0,
        unitAmount: 0,
      });
    });
  });
});
