import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreditsService } from './credits.service';
import { CreateCreditDto } from './dto/create-credit.dto';
import { UpdateCreditDto } from './dto/update-credit.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Credits')
@Controller('credits')
export class CreditsController {
  constructor(private readonly creditService: CreditsService) {}

  @Post()
  create(@Body() createCreditDto: CreateCreditDto) {
    return this.creditService.create(createCreditDto);
  }

  @Get()
  findAll() {
    return this.creditService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.creditService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCreditDto: UpdateCreditDto) {
    return this.creditService.update(+id, updateCreditDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.creditService.remove(+id);
  }
}
