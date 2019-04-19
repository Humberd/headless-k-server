import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

export interface NotificationData {
  title: string;
  body: string;
}

@Injectable()
export class NotificationService {

  async sendNotification(fcmToken: string, data: NotificationData) {
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

  async sendWorkerDisconnected(fcmToken: string, timeInterval: number) {
    return this.sendNotification(fcmToken, {
      title: 'Worker DISCONNECTED',
      body: `Status events have not been received within the last ${timeInterval} minutes`
    });
  }
}
