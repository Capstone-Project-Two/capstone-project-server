import { Body, Controller, Get, Post } from '@nestjs/common';
import { CatsService } from './cats.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatResponseDto } from './dto/response/cat-response.dto';

@ApiTags('Cats')
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @ApiOkResponse({
    type: CatResponseDto,
  })
  @Get()
  findAll(): Promise<Array<CatResponseDto>> {
    return this.catsService.findAll();
  }

  @Post()
  async createCat(@Body() catDto: CreateCatDto) {
    return await this.catsService.createCat(catDto);
  }
}
