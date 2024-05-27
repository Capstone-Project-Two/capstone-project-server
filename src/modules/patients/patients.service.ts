import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Patient } from 'src/database/schemas/patient.schema';
import { Model } from 'mongoose';
import { phoneFormat } from 'src/utils/helpter';
import { Post } from 'src/database/schemas/post.schema';
import { getPaginateMeta } from 'src/common/paginate';
import { error } from 'console';
import { PaginationParamDto } from 'src/common/dto/pagination-param.dto';

@Injectable()
export class PatientsService {
  constructor(
    @InjectModel(Patient.name) private patientModel: Model<Patient>,
    @InjectModel(Post.name) private postModel: Model<Post>,
  ) {}

  async create(createPatientDto: CreatePatientDto) {
    try {
      const res = await this.patientModel.create({
        phone_number: phoneFormat(createPatientDto.phone_number.trim()),
        ...createPatientDto,
      });
      return res;
    } catch (e) {
      return e;
    }
  }

  async findAll(pagination: PaginationParamDto) {
    const { limit, page } = pagination;
    try {
      const skip = page * limit - limit;
      const res = await this.patientModel
        .find()
        .limit(limit)
        .skip(Number(page) === 0 || Number(page) === 1 ? 0 : skip)
        .populate(['posts'])
        .exec();

      if (page > 1 && res.length === 0)
        throw new HttpException(
          {
            status: HttpStatus.NO_CONTENT,
            error: 'No Data',
          },
          HttpStatus.NO_CONTENT,
          { cause: error },
        );

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
    } catch (e) {
      return e;
    }
  }

  async findOne(id: string) {
    try {
      const res = await this.patientModel
        .findById(id)
        .populate(['posts'])
        .exec();
      if (!res) {
        throw new NotFoundException();
      }
      return res;
    } catch (e) {
      return e;
    }
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
    try {
      const res = await this.patientModel.updateOne(
        { _id: id },
        { is_banned: true },
      );

      return res;
    } catch (e) {
      return e;
    }
  }

  async unbanPatient(id: string) {
    try {
      const res = await this.patientModel.updateOne(
        { _id: id },
        { is_banned: false },
      );

      return res;
    } catch (e) {
      return e;
    }
  }

  async remove(id: string) {
    const res = await this.patientModel.deleteOne({ _id: id });

    /** @description deletes post related to user */
    await this.postModel.deleteMany({ patient: id });

    return res;
  }
}
