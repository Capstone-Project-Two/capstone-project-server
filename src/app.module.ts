import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './config/database/database.module';
import { AdminsModule } from './modules/admins/admins.module';
import { PatientsModule } from './modules/patients/patients.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './common/response.interceptor';
import { TherapistsModule } from './modules/therapists/therapists.module';
import { PostsModule } from './modules/posts/posts.module';
import { SeedsModule } from './modules/seeds/seeds.module';
import { FactoriesModule } from './modules/factories/factories.module';
import { EventsModule } from './config/web-socket/events.module';
import { AppointmentsModule } from './modules/appointments/appointments.module';
import { AuthModule } from './modules/auth/auth.module';
import { CredentialModule } from './modules/credential/credential.module';
import { AtGuard } from './common/guards';
import { LikePostsModule } from './modules/like-posts/like-posts.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    AdminsModule,
    PatientsModule,
    TherapistsModule,
    PostsModule,
    SeedsModule,
    FactoriesModule,
    EventsModule,
    LikePostsModule,
    AppointmentsModule,
    AuthModule,
    CredentialModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class AppModule {}
