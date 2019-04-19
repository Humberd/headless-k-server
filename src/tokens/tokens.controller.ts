import { Body, Controller, Put, UseGuards } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { ClientAuthGuard } from '../_shared/client-auth.guard';
import { ok } from '../utils';
import { FcmTokenUpdateRequest } from './_models/tokens.dto';

@Controller('tokens')
export class TokensController {

  constructor(private tokensService: TokensService) {

  }

  @Put('/')
  @UseGuards(ClientAuthGuard)
  async updateFcm(@Body() body: FcmTokenUpdateRequest) {
    await this.tokensService.saveFcm(body.fcmToken);
    return ok();
  }

}
