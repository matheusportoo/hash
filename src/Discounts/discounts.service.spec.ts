import { DiscountsService } from './discounts.service';
import client from '../shared/client-grpc';

describe('ProductService', () => {
  let productService: DiscountsService;
  let fetchDiscountMock;

  beforeEach(async () => {
    productService = new DiscountsService();
  });

  describe('get', () => {
    it('should return an object with percentage property on fetchDiscount sucess', () => {
      fetchDiscountMock = jest
        .spyOn(productService, 'fetchDiscount')
        .mockResolvedValue({ percentage: 0.0501 });
      const data = productService.get(1);

      expect(data).resolves.toEqual({ percentage: 0.05 });
    });

    it('should return an object with percentage property on fetchDiscount error', () => {
      fetchDiscountMock = jest
        .spyOn(productService, 'fetchDiscount')
        .mockRejectedValue({});
      const data = productService.get(1);

      expect(data).resolves.toEqual({ percentage: 0 });
    });
  });

  describe('fetchDiscount', () => {
    it('should call client.getDiscount', () => {
      const getDiscountMock = jest.spyOn(client, 'getDiscount');

      productService.fetchDiscount(1);

      expect(getDiscountMock).toBeCalledTimes(1);
    });
  });
});
