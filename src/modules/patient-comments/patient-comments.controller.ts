import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PatientCommentsService } from './patient-comments.service';
import { CreatePatientCommentDto } from './dto/create-patient-comment.dto';
import { UpdatePatientCommentDto } from './dto/update-patient-comment.dto';
import { ApiOkResponse } from '@nestjs/swagger';
import { PatientCommentResponse } from './dto/response/patient-comment-response.dto';

@Controller('patient-comments')
export class PatientCommentsController {
  constructor(
    private readonly patientCommentsService: PatientCommentsService,
  ) {}

  @Post()
  create(@Body() createPatientCommentDto: CreatePatientCommentDto) {
    return this.patientCommentsService.create(createPatientCommentDto);
  }

  @ApiOkResponse({ type: PatientCommentResponse })
  @Get()
  findAll() {
    return this.patientCommentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientCommentsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePatientCommentDto: UpdatePatientCommentDto,
  ) {
    return this.patientCommentsService.update(+id, updatePatientCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patientCommentsService.remove(+id);
  }
}