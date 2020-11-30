import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGODB_URI), ProductsModule, HealthModule]
})
export class AppModule {}
