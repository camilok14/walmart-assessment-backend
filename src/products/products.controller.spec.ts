import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';

describe('ProductsController', () => {
  let controller: ProductsController;
  const productsServiceMock: any = {};
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [{ provide: 'ProductsService', useValue: productsServiceMock }]
    }).compile();
    controller = module.get<ProductsController>(ProductsController);
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should find products using search string from query', async () => {
    productsServiceMock.findProductsBySearchString = jest.fn(async () => 'products');
    const query = { search: 'searchString' };
    const result = await controller.findProducts(query);
    expect(result).toBe('producst');
    expect(productsServiceMock.findProductsBySearchString).toHaveBeenCalledWith(query.search);
  });
});
