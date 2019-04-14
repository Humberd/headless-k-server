import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class NotificationService {
  private readonly registrationToken = 'c9Iw3oxMgC0:APA91bF-p9FlVUTKWpoqAVtYKCcePRwFV3a7MJAgnaBxoK3CbQcnLKHcAQizSjknVeBqdl5Uu42E2qQO8XzATLaka8qWvkN0obmfH7Eor6gHgu83O0F3dKNMA-VDyUY4pRLNMoUmo0p4';

  constructor() {

  }

  async sendNotification(title: string, body: string) {
    const response = await admin.messaging().sendToDevice(this.registrationToken, {
      notification: {
        title,
        body
      }
    });

    if (!response.failureCount) {
      return response;
    }

    throw response.results[0].error;
  }
}
