import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TokensDao } from './_models/tokens.dao';

@Injectable()
export class TokensRepositoryService {
  private readonly WORKER_ID = 'worker';

  constructor(@InjectModel('Tokens') private readonly tokensModel: Model<TokensDao>) {
  }

  async saveFcm(fcmToken: string) {
    return this.tokensModel.findByIdAndUpdate(
        this.WORKER_ID,
        {
          fcmToken: fcmToken
        } as TokensDao,
        {
          upsert: true
        }
    );
  }

  async read() {
    return await this.tokensModel.findById(this.WORKER_ID);
  }
}
