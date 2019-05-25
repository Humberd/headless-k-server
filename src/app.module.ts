import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StatusModule } from './status/status.module';
import { getMongoConnectionString } from './_shared/mongo.init';
import { initFirebase } from './_shared/firebase.init';
import { MongooseModule } from '@nestjs/mongoose';
import { TokensModule } from './tokens/tokens.module';
import { JobsModule } from './jobs/jobs.module';

@Module({
  imports: [
    MongooseModule.forRoot(getMongoConnectionString(), {useNewUrlParser: true}),
    JobsModule,
    StatusModule,
    TokensModule
  ],
  controllers: [AppController],
  providers: [
    AppService
  ],
})
export class AppModule implements OnApplicationBootstrap {

  onApplicationBootstrap(): any {
    initFirebase();
  }

}
