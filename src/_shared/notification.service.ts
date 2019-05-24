import { Injectable, Logger } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { TokensService } from '../tokens/tokens.service';

export interface NotificationData {
  title: string;
  body: string;
}

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);

  constructor(private tokensService: TokensService) {

  }

  async sendWorkerDisconnected(timeInterval: number) {
    return this.sendNotification({
      title: 'Worker DISCONNECTED',
      body: `Status events have not been received within the last ${timeInterval} minutes`
    });
  }

  async sendWorkerFatalError(errorMessage: string) {
    return this.sendNotification({
      title: 'Worker FATAL ERROR',
      body: `${errorMessage}`
    });
  }

  private async sendNotification(data: NotificationData) {
    let fcmToken: string;
    try {
      fcmToken = await this.tokensService.readFcm();
    } catch (e) {
      this.logger.error(`Fcm token not available -> ${e}`);
      return;
    }

    try {
      const response = await this._sendNotification(fcmToken, data);
      console.log(response);
    } catch (e) {
      this.logger.error(`Notification could not be sent -> ${e}`);
      return;
    }

    this.logger.log('Notification sent successfully');
  }

  private async _sendNotification(fcmToken: string, data: NotificationData) {
    const response = await admin.messaging().sendToDevice(fcmToken, {
      notification: {
        title: data.title,
        body: data.body
      }
    });

    if (!response.failureCount) {
      return response;
    }

    throw response.results[0].error;
  }

}
