import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StatusModule } from './status/status.module';
import { NotificationService } from './_shared/notification.service';
import { getMongoConnectionString } from './_shared/mongo.init';
import { initFirebase } from './_shared/firebase.init';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(getMongoConnectionString(), {useNewUrlParser: true}),
    // JobsModule
    StatusModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    NotificationService
  ],
})
export class AppModule implements OnApplicationBootstrap {

  onApplicationBootstrap(): any {
    initFirebase();
  }

}
