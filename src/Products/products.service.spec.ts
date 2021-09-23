import { ProductsService } from './products.service';

describe('ProductService', () => {
  let productService: ProductsService;

  beforeEach(async () => {
    productService = new ProductsService();
  });

  it('should return all products', () => {
    const products = productService.findAll();

    expect(products.length).toBe(6);
  });

  it('should return product by id', () => {
    const product = productService.findById(1);

    expect(product).toEqual({
      id: 1,
      title: 'Ergonomic Wooden Pants',
      description: 'Deleniti beatae porro.',
      amount: 15157,
      is_gift: false,
    });
  });

  it("should return an exception when don't find a product", () => {
    try {
      productService.findById(12);
    } catch (error) {
      expect(error.message).toEqual('Not found');
      expect(error.status).toEqual(404);
    }
  });
});
