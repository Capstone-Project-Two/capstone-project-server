import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTherapistDto } from './dto/create-therapist.dto';
import { UpdateTherapistDto } from './dto/update-therapist.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Therapist } from 'src/database/schemas/therapist.schema';

@Injectable()
export class TherapistsService {
  constructor(
    @InjectModel(Therapist.name) private therapistModel: Model<Therapist>,
  ) {}

  async create(createTherapistDto: CreateTherapistDto) {
    try {
      const res = await this.therapistModel.create(createTherapistDto);
      return res;
    } catch (error) {
      return error;
    }
  }

  async findAll() {
    return await this.therapistModel.find().exec();
  }

  async findOne(id: string) {
    try {
      const res = await this.therapistModel.findById(id).exec();
      if (!res) {
        throw new NotFoundException();
      }
      return res;
    } catch (error) {
      return error;
    }
  }

  async update(id: string, updateTherapistDto: UpdateTherapistDto) {
    try {
      const res = await this.therapistModel.updateOne(
        { _id: id, },
        { ...updateTherapistDto, },
      );
      return {
        data: {
          res, 
          field: updateTherapistDto
        }
      }
    } catch (error) {
      return error;
    }
  }

  async remove(id: string) {
    try {
      const res = await this.therapistModel.deleteOne({
        _id: id,
      });

      return res;
    } catch (error) {
      return error;
    }
  }
}
