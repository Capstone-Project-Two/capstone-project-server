import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTherapistDto } from './dto/create-therapist.dto';
import { UpdateTherapistDto } from './dto/update-therapist.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Therapist } from 'src/database/schemas/therapist.schema';
import { phoneFormat } from 'src/utils/helpter';

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

  async findAll() {
    return await this.therapistModel.find().exec();
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
