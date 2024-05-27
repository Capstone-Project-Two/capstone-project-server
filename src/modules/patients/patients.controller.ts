import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { PatientResponseDto } from './dto/response/patient-response.dto';
import { RelationalPatientResponseDto } from './dto/response/relational-patient-response.dto';
import { PaginationParamDto } from 'src/common/dto/pagination-param.dto';

@ApiTags('Patients')
@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientsService.create(createPatientDto);
  }

  @ApiOkResponse({ type: RelationalPatientResponseDto, isArray: true })
  @ApiQuery({ name: 'limit', type: Number, example: 10, required: false })
  @ApiQuery({ name: 'page', type: Number, example: 1, required: false })
  @Get()
  findAll(@Query() pagination: PaginationParamDto) {
    return this.patientsService.findAll(pagination);
  }

  @ApiOkResponse({ type: PatientResponseDto })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientsService.update(id, updatePatientDto);
  }

  @Patch('/ban-patient/:id')
  banPatient(@Param('id') id: string) {
    return this.patientsService.banPatient(id);
  }

  @Patch('/unban-patient/:id')
  unbanPatient(@Param('id') id: string) {
    return this.patientsService.unbanPatient(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patientsService.remove(id);
  }
}
