import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './config/database/database.module';
import { AdminsModule } from './modules/admins/admins.module';
import { PatientsModule } from './modules/patients/patients.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './common/response.interceptor';
import { TherapistsModule } from './modules/therapists/therapists.module';
import { PostsModule } from './modules/posts/posts.module';
import { SeedsModule } from './modules/seeds/seeds.module';
import { FactoriesModule } from './modules/factories/factories.module';
import { EventsModule } from './config/web-socket/events.module';
import { LikePostsModule } from './modules/like-posts/like-posts.module';
import { PostPhotosModule } from './modules/post-photos/post-photos.module';
import { MulterModule } from '@nestjs/platform-express';
import { STATIC_FILE_DESTINATION } from './constants/multer-file-constant';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: STATIC_FILE_DESTINATION,
      }),
    }),
    ServeStaticModule.forRoot({
      rootPath: STATIC_FILE_DESTINATION,
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
    PostPhotosModule,
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
