import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTherapistDto } from './dto/create-therapist.dto';
import { UpdateTherapistDto } from './dto/update-therapist.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Therapist } from 'src/schemas/therapist.schema';
import { Model } from 'mongoose';
import { TherapistResponseDto } from './dto/response/therapist-response.dto';

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

  async findAll(){
    return await this.therapistModel.find();
  }

  async findOne(id: string){
    try {
      const res = await this.therapistModel.findOne({ _id: id }).exec()
      if (!res) {
        throw new NotFoundException();
      }
      return res;
    } catch (error) {
      return error;
    }
  }

  async update(id: string, updateTherapistDto: UpdateTherapistDto) {
    return updateTherapistDto
  }

  remove(id: number) {
    return `This action removes a #${id} therapist`;
  }
}
