import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './config/database/database.module';
import { AdminsModule } from './modules/admins/admins.module';
import { PatientsModule } from './modules/patients/patients.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './common/response.interceptor';
import { PostsModule } from './modules/posts/posts.module';
import { SeedsModule } from './modules/seeds/seeds.module';
import { FactoriesModule } from './modules/factories/factories.module';
import { EventsModule } from './config/web-socket/events.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    AdminsModule,
    PatientsModule,
    PostsModule,
    SeedsModule,
    FactoriesModule,
    EventsModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {}
