import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Product {
  @Prop()
  id: number;

  @Prop()
  brand: string;

  @Prop()
  description: string;

  @Prop()
  image: string;

  @Prop()
  price: number;
}

export interface ProductDocument extends Product, Document {}

export const ProductSchema = SchemaFactory.createForClass(Product);