import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Patient } from 'src/database/schemas/patient.schema';
import { Model } from 'mongoose';
import { phoneFormat } from 'src/utils/helpter';
import { Post } from 'src/database/schemas/post.schema';
import { PatientSeederDto } from 'src/database/seeders/patient-seeder/dto/patient-seeder.dto';
import { PatientFactory } from 'src/database/factories/patients.factory';

@Injectable()
export class PatientsService {
  constructor(
    @InjectModel(Patient.name) private patientModel: Model<Patient>,
    @InjectModel(Post.name) private postModel: Model<Post>,
  ) {}

  async dropPatients() {
    try {
      const res = await this.patientModel.deleteMany();
      return res;
    } catch (e) {
      return e;
    }
  }

  async seedPatient(length: PatientSeederDto) {
    try {
      const res = await this.dropPatients().then(async () => {
        const res = await this.patientModel.insertMany(
          PatientFactory({ length: length.lenght ?? 100 }),
        );
        return res;
      });

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
    const res = await this.patientModel.find().populate(['posts']).exec();
    return res;
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
