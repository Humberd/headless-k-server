import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TokensSchema } from './_models/tokens.dao';
import { TokensController } from './tokens.controller';
import { TokensService } from './tokens.service';
import { TokensRepositoryService } from './tokens-repository.service';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Tokens', schema: TokensSchema}])],
  controllers: [TokensController],
  providers: [
    TokensService,
    TokensRepositoryService
  ],
  exports: [
    TokensService
  ]
})
export class TokensModule {
}
