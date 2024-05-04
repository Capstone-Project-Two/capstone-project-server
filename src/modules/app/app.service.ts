import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ENV_MODE } from '../../constants/env-constants';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}
  index() {
    return 'Hello'
  }
  envMode() {
    return {
      envMode: this.configService.get(ENV_MODE),
    };
  }
}
