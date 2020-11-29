import { Module } from '@nestjs/common';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schemas/product.schema';

const productModel: ModelDefinition = {
  name: Product.name,
  schema: ProductSchema,
  collection: 'products'
};
const productMongooseModule = MongooseModule.forFeature([productModel]);
@Module({
  imports: [productMongooseModule]
})
export class ProductsModule {}
