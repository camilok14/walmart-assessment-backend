import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';

describe('ProductsService', () => {
  let service: ProductsService;
  const productModelMock: any = {};
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService, { provide: 'ProductModel', useValue: productModelMock }]
    }).compile();
    service = module.get<ProductsService>(ProductsService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should throw bad request error if id is not valid', async () => {
    await expect(service.findProductsBySearchString('la')).rejects.toThrow('Search strings shorter than 3 characters must be valid product id');
  });
  it('should perform query against database using product id', async () => {
    productModelMock.find = jest.fn(async () => 'products');
    const searchString = '12';
    const result = await service.findProductsBySearchString(searchString);
    expect(result).toBe('products');
    expect(productModelMock.find).toHaveBeenCalledWith({
      $or: [{ id: 12 }]
    });
  });
  it('should perform query against database using search string', async () => {
    productModelMock.find = jest.fn(async () => 'products');
    const searchString = 'searchString';
    const result = await service.findProductsBySearchString(searchString);
    expect(result).toBe('products');
    const $regex = `.*${searchString}.*`;
    expect(productModelMock.find).toHaveBeenCalledWith({
      $or: [{ description: { $regex } }, { brand: { $regex } }]
    });
  });
});
