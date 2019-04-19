import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { StatusRepositoryService } from './status-repository.service';
import { StatusUpdateRequest } from './_models/status.dto';
import { TokensService } from '../tokens/tokens.service';
import { Subject } from 'rxjs';
import { debounceTime, switchMap, takeUntil } from 'rxjs/operators';
import { time } from '../utils';
import { NotificationService } from '../_shared/notification.service';

@Injectable()
export class StatusService implements OnModuleInit, OnModuleDestroy {
  private readonly DISCONNECT_TIME_INTERVAL = 1;
  private readonly logger = new Logger(StatusService.name);

  private readonly destroy$ = new Subject();
  private readonly online$ = new Subject();

  constructor(private repository: StatusRepositoryService,
              private tokensService: TokensService,
              private notificationService: NotificationService) {

  }

  onModuleInit() {
    this.online$
        .pipe(
            takeUntil(this.destroy$),
            debounceTime(time(this.DISCONNECT_TIME_INTERVAL, 'minutes')),
            switchMap(() => this.sendUserNotification())
        )
        .subscribe();
  }

  onModuleDestroy() {
    this.destroy$.next();
  }

  private async sendUserNotification(): Promise<void> {
    this.logger.log('Worker is probably disconnected');

    let fcmToken: string;
    try {
      fcmToken = await this.tokensService.readFcm();
    } catch (e) {
      this.logger.error(`Fcm token not available -> ${e}`);
      return;
    }

    try {
      await this.notificationService.sendWorkerDisconnected(fcmToken, this.DISCONNECT_TIME_INTERVAL);
    } catch (e) {
      this.logger.error(`Notification could not be sent -> ${e}`);
      return;
    }

  }

  async save(data: StatusUpdateRequest) {
    this.online$.next(data);
    return await this.repository.save(data);
  }

  async read() {
    return this.repository.read();
  }
}
