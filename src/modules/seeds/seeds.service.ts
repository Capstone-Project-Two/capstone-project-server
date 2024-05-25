import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Patient } from 'src/database/schemas/patient.schema';
import { Model } from 'mongoose';
import { seed } from 'src/utils/seed-helpter';
import { PatientSeeder } from 'src/database/seeders/patient-seeder/patient.seeder';
import { Post } from 'src/database/schemas/post.schema';
import { PostSeeder } from 'src/database/seeders/post-seeder/post.seeder';

@Injectable()
export class SeedsService {
  constructor(
    @InjectModel(Patient.name) private patientsModel: Model<Patient>,
    @InjectModel(Post.name) private postsModel: Model<Post>,
  ) {}

  async create() {
    // seed patients
    await seed({
      model: this.patientsModel,
      seedData: PatientSeeder(),
    });

    // seed posts
    await seed({
      model: this.postsModel,
      seedData: PostSeeder(),
    });

    return 'Seed successful';
  }
}
