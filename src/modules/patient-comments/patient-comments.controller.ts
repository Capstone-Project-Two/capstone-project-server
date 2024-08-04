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
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { RelationalPatientCommentResponseDto } from './dto/response/relational-patient-comment-response.dto';

@ApiTags('Patient Comments')
@Controller('patient-comments')
export class PatientCommentsController {
  constructor(
    private readonly patientCommentsService: PatientCommentsService,
  ) {}

  @Post()
  create(@Body() createPatientCommentDto: CreatePatientCommentDto) {
    return this.patientCommentsService.create(createPatientCommentDto);
  }

  @ApiOkResponse({ type: RelationalPatientCommentResponseDto, isArray: true })
  @Get()
  findAll() {
    return this.patientCommentsService.findAll();
  }

  @ApiOkResponse({ type: RelationalPatientCommentResponseDto })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientCommentsService.findOne(id);
  }

  @ApiOkResponse({ type: RelationalPatientCommentResponseDto, isArray: true })
  @Get('post/:id')
  findCommentByPost(@Param('id') id: string) {
    return this.patientCommentsService.findCommentByPost(id);
  }

  @Get('all-replies/:id')
  findAllReplies(@Param('id') id: string) {
    return this.patientCommentsService.findAllReplies(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePatientCommentDto: UpdatePatientCommentDto,
  ) {
    return this.patientCommentsService.update(id, updatePatientCommentDto);
  }

  @Patch('remove-comment/:id')
  removePost(@Param('id') id: string) {
    return this.patientCommentsService.removeComment(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patientCommentsService.remove(id);
  }
}
