import { Module } from '@nestjs/common';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schemas/product.schema';
import { ProductsController } from './products.controller';

const productModel: ModelDefinition = {
  name: Product.name,
  schema: ProductSchema,
  collection: 'products'
};
const productMongooseModule = MongooseModule.forFeature([productModel]);
@Module({
  imports: [productMongooseModule],
  controllers: [ProductsController]
})
export class ProductsModule {}
