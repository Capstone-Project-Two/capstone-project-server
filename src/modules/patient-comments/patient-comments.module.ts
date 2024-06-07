import { Module } from '@nestjs/common';
import { PatientCommentsService } from './patient-comments.service';
import { PatientCommentsController } from './patient-comments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PatientCommentSchema,
  PatientComment,
} from 'src/database/schemas/patient-comment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PatientComment.name, schema: PatientCommentSchema },
    ]),
  ],
  controllers: [PatientCommentsController],
  providers: [PatientCommentsService],
})
export class PatientCommentsModule {}
