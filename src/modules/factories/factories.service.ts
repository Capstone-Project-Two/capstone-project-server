import { Injectable } from '@nestjs/common';
import { CreateFactoryDto } from './dto/create-factory.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Patient } from 'src/database/schemas/patient.schema';
import { Model } from 'mongoose';
import { Post } from 'src/database/schemas/post.schema';
import { seed } from 'src/utils/seeder-helpter';
import { PatientFactory } from 'src/database/factories/patients.factory';
import { PostFactory } from 'src/database/factories/posts.factory';
import { Therapist } from 'src/database/schemas/therapist.schema';
import { TherapistFactory } from 'src/database/factories/therapists.factory';

@Injectable()
export class FactoriesService {
  constructor(
    @InjectModel(Patient.name) private patientsModel: Model<Patient>,
    @InjectModel(Post.name) private postsModel: Model<Post>,
    @InjectModel(Therapist.name) private therapistModel: Model<Therapist>,
  ) {}

  async create(createFactoryDto: CreateFactoryDto) {
    await seed({
      model: this.patientsModel,
      seedData: PatientFactory({ ...createFactoryDto }),
    });

    await seed({
      model: this.postsModel,
      seedData: PostFactory({ ...createFactoryDto }),
    });

    await seed({
      model: this.therapistModel,
      seedData: TherapistFactory({ ...createFactoryDto }),
    });

    // Other factory

    return {
      message: 'Finish running factory',
    };
  }
}
