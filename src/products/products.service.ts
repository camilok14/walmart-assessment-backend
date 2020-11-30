import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private readonly productModel: Model<ProductDocument>) {}

  public async findProductsBySearchString(searchString: string): Promise<Product[]> {
    const onlyNumbers = /^[0-9]+$/.test(searchString);
    const moreThan3Chars = searchString.length >= 3;
    if (!onlyNumbers && !moreThan3Chars) {
      throw new HttpException('Search strings shorter than 3 characters must be valid product id', HttpStatus.BAD_REQUEST);
    }
    const $or = [];
    if (onlyNumbers) {
      $or.push({ id: parseInt(searchString) });
    }
    if (moreThan3Chars) {
      const $regex = `.*${searchString}.*`;
      $or.push({ description: { $regex } });
      $or.push({ brand: { $regex } });
    }
    return this.productModel.find({ $or });
  }
}
