import { Injectable, NotFoundException } from '@nestjs/common';
import { TokensRepositoryService } from './tokens-repository.service';

@Injectable()
export class TokensService {
  constructor(private repository: TokensRepositoryService) {

  }

  async saveFcm(fcmToken: string) {
    return await this.repository.saveFcm(fcmToken);
  }

  async readFcm(): Promise<string> {
    const response = await this.repository.read();

    if (!response || !response.fcmToken) {
      throw new NotFoundException('Fcm token not found');
    }

    return response.fcmToken;
  }
}
