import { Module } from '@nestjs/common';
import { TherapistsService } from './therapists.service';
import { TherapistsController } from './therapists.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Therapist, TherapistSchema } from 'src/database/schemas/therapist.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Therapist.name, schema: TherapistSchema }]),
  ],
  controllers: [TherapistsController],
  providers: [TherapistsService],
})
export class TherapistsModule {}
