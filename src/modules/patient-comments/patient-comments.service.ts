import { Injectable } from '@nestjs/common';
import { CreatePatientCommentDto } from './dto/create-patient-comment.dto';
import { UpdatePatientCommentDto } from './dto/update-patient-comment.dto';

@Injectable()
export class PatientCommentsService {
  create(createPatientCommentDto: CreatePatientCommentDto) {
    return 'This action adds a new patientComment';
  }

  findAll() {
    return `This action returns all patientComments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} patientComment`;
  }

  update(id: number, updatePatientCommentDto: UpdatePatientCommentDto) {
    return `This action updates a #${id} patientComment`;
  }

  remove(id: number) {
    return `This action removes a #${id} patientComment`;
  }
}
