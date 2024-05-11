import { Controller, Get } from '@nestjs/common';
import { CatsService } from './cats.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Cats')
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  findAll() {
    return this.catsService.findAll();
  }
}
