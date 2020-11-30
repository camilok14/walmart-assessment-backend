import { Controller, Get } from '@nestjs/common';
import { HealthOutputDto } from './dto/health-output.dto';

@Controller('health')
export class HealthController {
  @Get()
  public getHealthCheck(): HealthOutputDto {
    return { message: 'walmart-assessment-backend is up and running' };
  }
}
