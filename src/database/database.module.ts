import { FactoryProvider, Module } from '@nestjs/common';
import * as mongoose from 'mongoose';

const databaseConnectionProvider: FactoryProvider = {
  provide: 'DatabaseConnection',
  async useFactory(): Promise<typeof mongoose> {
    return await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  }
};
@Module({
  providers: [databaseConnectionProvider],
  exports: [databaseConnectionProvider]
})
export class DatabaseModule {}
