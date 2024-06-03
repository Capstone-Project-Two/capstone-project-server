import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTherapistDto } from './dto/create-therapist.dto';
import { UpdateTherapistDto } from './dto/update-therapist.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Therapist } from 'src/database/schemas/therapist.schema';
import { phoneFormat } from 'src/utils/helpter';
import { PaginationParamDto } from 'src/common/dto/pagination-param.dto';
import { error } from 'console';
import { getPaginateMeta } from 'src/common/paginate';

@Injectable()
export class TherapistsService {
  constructor(
    @InjectModel(Therapist.name) private therapistModel: Model<Therapist>,
  ) {}

  async create(createTherapistDto: CreateTherapistDto) {
    const res = await this.therapistModel.create({
      phone_number: phoneFormat(createTherapistDto.phone_number.trim()),
      ...createTherapistDto,
    });
    return {
      message: 'Therapist Created Successfully!',
      data: res,
    };
  }

  async getAllSpecializations() {
    const specializations = await this.therapistModel
      .aggregate([
        { $unwind: '$specializations' },
        {
          $group: {
            _id: null,
            specializations: { $addToSet: '$specializations' },
          },
        },
        { $project: { _id: 0, specializations: 1 } },
      ])
      .exec();
    return specializations.length > 0 ? specializations[0].specializations : [];
  }

  async findAll(pagination: PaginationParamDto) {
    const { limit, page } = pagination;
    const skip = page * limit - limit;
    const res = await this.therapistModel
      .find()
      .limit(limit)
      .skip(Number(page) === 0 || Number(page) === 1 ? 0 : skip)
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
          model: this.therapistModel,
          resLength: res.length,
        })),
      },
    };
  }

  async findOne(id: string) {
    const res = await this.therapistModel
      .findOne({
        _id: id,
      })
      .exec();
    if (!res) {
      throw new NotFoundException();
    }
    return res;
  }

  async update(id: string, updateTherapistDto: UpdateTherapistDto) {
    const res = await this.therapistModel.updateOne(
      { _id: id },
      { ...updateTherapistDto },
    );
    return {
      data: {
        res,
        field: updateTherapistDto,
      },
    };
  }

  async remove(id: string) {
    const res = await this.therapistModel.deleteOne({
      _id: id,
    });

    return res;
  }
}
