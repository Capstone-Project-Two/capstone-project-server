import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './config/database/database.module';
import { AdminsModule } from './modules/admins/admins.module';
import { PatientsModule } from './modules/patients/patients.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    AdminsModule,
    PatientsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
