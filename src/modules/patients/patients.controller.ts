import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PatientResponseDto } from './dto/response/patient-response.dto';

@ApiTags('Patients')
@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post('/seed')
  createMany() {
    return this.patientsService.seedPatient();
  }

  @Post()
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientsService.create(createPatientDto);
  }

  @ApiOkResponse({ type: PatientResponseDto, isArray: true })
  @Get()
  findAll() {
    return this.patientsService.findAll();
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
