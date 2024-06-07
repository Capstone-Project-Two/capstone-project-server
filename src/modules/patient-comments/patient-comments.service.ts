import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePatientCommentDto } from './dto/create-patient-comment.dto';
import { UpdatePatientCommentDto } from './dto/update-patient-comment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { PatientComment } from 'src/database/schemas/patient-comment.schema';
import { Model } from 'mongoose';
import { Patient } from 'src/database/schemas/patient.schema';
import { Post } from 'src/database/schemas/post.schema';

@Injectable()
export class PatientCommentsService {
  constructor(
    @InjectModel(PatientComment.name)
    private patientCommentModel: Model<PatientComment>,
    @InjectModel(Patient.name) private patientModel: Model<Patient>,
    @InjectModel(Post.name) private postModel: Model<Post>,
  ) {}

  async create(createPatientCommentDto: CreatePatientCommentDto) {
    const findPatient = await this.patientModel.findOne({
      _id: createPatientCommentDto.patient,
    });

    if (!findPatient) throw new NotFoundException('Patient not found');

    const findPost = await this.postModel.findOne({
      _id: createPatientCommentDto.post,
    });

    if (!findPost) throw new NotFoundException('Post not found');

    const res = await this.patientCommentModel.create(createPatientCommentDto);
    await findPost.updateOne({
      comment_count: Number(findPost.comment_count) + 1,
    });

    return res;
  }

  async findAll() {
    const res = await this.patientCommentModel.find().populate(['patient']);
    return res;
  }

  async findOne(id: string) {
    const res = await this.patientCommentModel.findOne({
      _id: id,
    });
    return res;
  }

  update(id: number, updatePatientCommentDto: UpdatePatientCommentDto) {
    return `This action updates a #${id} patientComment`;
  }

  remove(id: number) {
    return `This action removes a #${id} patientComment`;
  }
}
