import { Test } from '@nestjs/testing';
import { DiscountsService } from './discounts.service';
import { ClientGRPC } from '../shared/client-grpc';

describe('ProductService', () => {
  let discountsService: DiscountsService;
  let clientGRPC: ClientGRPC;
  let fetchDiscountMock;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [DiscountsService, ClientGRPC],
    }).compile();

    clientGRPC = moduleRef.get<ClientGRPC>(ClientGRPC);
    discountsService = moduleRef.get<DiscountsService>(DiscountsService);
  });

  describe('get', () => {
    it('should return an object with percentage property on fetchDiscount sucess', () => {
      fetchDiscountMock = jest
        .spyOn(discountsService, 'fetchDiscount')
        .mockResolvedValue({ percentage: 0.0501 });
      const data = discountsService.get(1);

      expect(data).resolves.toEqual({ percentage: 0.05 });
    });

    it('should return an object with percentage property on fetchDiscount error', () => {
      fetchDiscountMock = jest
        .spyOn(discountsService, 'fetchDiscount')
        .mockRejectedValue({});
      const data = discountsService.get(1);

      expect(data).resolves.toEqual({ percentage: 0 });
    });
  });

  describe('fetchDiscount', () => {
    it('should call clientGRPC.init', () => {
      const getDiscountMock = jest
        .spyOn(clientGRPC, 'init')
        .mockImplementation(() => ({ getDiscount: null }));

      discountsService.fetchDiscount(1);

      expect(getDiscountMock).toBeCalledTimes(1);
    });
  });
});
