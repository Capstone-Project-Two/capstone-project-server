import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Patient } from 'src/schemas/patient.schema';
import { Model } from 'mongoose';
import { phoneFormat } from 'src/utils/helpter';
import { patientsData } from 'src/data/patients-data';

@Injectable()
export class PatientsService {
  constructor(
    @InjectModel(Patient.name) private patientModel: Model<Patient>,
  ) {}

  async createMany() {
    try {
      const res = await this.patientModel.insertMany(patientsData);
      return res;
    } catch (e) {
      return e;
    }
  }

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

  async findAll() {
    const res = await this.patientModel.find().exec();
    return res;
  }

  async findOne(id: string) {
    try {
      const res = await this.patientModel.findOne({ _id: id }).exec();
      if (!res) {
        throw new NotFoundException();
      }
      return res;
    } catch (e) {
      return e;
    }
  }

  async update(id: string, updatePatientDto: UpdatePatientDto) {
    const res = await this.patientModel.updateOne(
      { _id: id },
      { ...updatePatientDto },
    );
    return {
      data: {
        res,
        field: updatePatientDto,
      },
    };
  }

  async remove(id: string) {
    const res = await this.patientModel.deleteOne({ _id: id });
    return res;
  }
}
