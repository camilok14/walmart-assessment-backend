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
  it('should perform query against database using non palindrome product id', async () => {
    productModelMock.aggregate = jest.fn(async () => 'products');
    const searchString = '12';
    const result = await service.findProductsBySearchString(searchString);
    expect(result).toBe('products');
    expect(productModelMock.aggregate).toHaveBeenCalledWith([
      {
        $match: {
          $or: [{ id: 12 }]
        }
      }
    ]);
  });
  it('should perform query against database using palindrome search string', async () => {
    productModelMock.aggregate = jest.fn(async () => 'products');
    const searchString = 'aba';
    const result = await service.findProductsBySearchString(searchString);
    expect(result).toBe('products');
    const $regex = `.*${searchString}.*`;
    expect(productModelMock.aggregate).toHaveBeenCalledWith([
      {
        $match: {
          $or: [{ description: { $regex } }, { brand: { $regex } }]
        }
      },
      {
        $set: {
          priceWithDiscount: { $divide: ['$price', 2] }
        }
      },
      {
        $set: {
          priceWithDiscount: { $round: ['$priceWithDiscount', 0] }
        }
      }
    ]);
  });
});
