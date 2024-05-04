import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { API_BASE_URL, ENV_MODE } from '../../constants/env-constants';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}
  index() {
    return {
      message: 'Hello! This is Capstone 2 API',
      env: this.configService.get(ENV_MODE),
      baseUrl: this.configService.get(API_BASE_URL),
    };
  }
}
