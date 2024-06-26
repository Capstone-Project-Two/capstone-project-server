import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Patient } from 'src/database/schemas/patient.schema';
import { Model } from 'mongoose';
import { phoneFormat } from 'src/utils/helpter';
import { Post } from 'src/database/schemas/post.schema';
import { getPaginateMeta } from 'src/common/paginate';
import { PaginationParamDto } from 'src/common/dto/pagination-param.dto';

@Injectable()
export class PatientsService {
  constructor(
    @InjectModel(Patient.name) private patientModel: Model<Patient>,
    @InjectModel(Post.name) private postModel: Model<Post>,
  ) {}

  async create(createPatientDto: CreatePatientDto) {
    const res = await this.patientModel.create({
      phone_number: phoneFormat(createPatientDto.phone_number.trim()),
      ...createPatientDto,
    });
    return res;
  }

  async findAll(pagination: PaginationParamDto) {
    const { limit = 10, page = 1 } = pagination;
    const skip = page * limit - limit;
    const res = await this.patientModel
      .find()
      .limit(limit)
      .skip(skip)
      .populate(['posts'])
      .exec();

    return {
      data: res,
      meta: {
        ...(await getPaginateMeta({
          model: this.patientModel,
          limit,
          page,
          resLength: res.length,
        })),
      },
    };
  }

  async findOne(id: string) {
    const res = await this.patientModel.findById(id).populate(['posts']);
    if (!res) {
      throw new NotFoundException();
    }
    return res;
  }

  async update(id: string, updatePatientDto: UpdatePatientDto) {
    const res = await this.patientModel
      .updateOne({ _id: id }, { ...updatePatientDto })
      .exec();
    return {
      data: {
        res,
        field: updatePatientDto,
      },
    };
  }

  async banPatient(id: string) {
    const res = await this.patientModel.updateOne(
      { _id: id },
      { is_banned: true },
    );

    return res;
  }

  async unbanPatient(id: string) {
    const res = await this.patientModel.updateOne(
      { _id: id },
      { is_banned: false },
    );

    return res;
  }

  async remove(id: string) {
    const res = await this.patientModel.deleteOne({ _id: id });

    /** deletes post related to user */
    await this.postModel.deleteMany({ patient: id });

    return res;
  }
}
