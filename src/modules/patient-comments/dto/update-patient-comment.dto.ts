import { PartialType } from '@nestjs/swagger';
import { CreatePatientCommentDto } from './create-patient-comment.dto';

export class UpdatePatientCommentDto extends PartialType(CreatePatientCommentDto) {}
