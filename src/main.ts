import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: ['https://walmart-assessment-frontend.herokuapp.com/', 'http://localhost:8080'] });
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
