import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StatusModule } from './status/status.module';

const dbLogin = 'root';
const dbPass = 'admin123';
const dbUrl = '192.168.99.100:27017';
const dbName = 'admin';

const connectionString = `mongodb://${dbLogin}:${dbPass}@${dbUrl}/${dbName}`;

@Module({
  imports: [
    // MongooseModule.forRoot(connectionString, {useNewUrlParser: true}),
    // JobsModule
    StatusModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
