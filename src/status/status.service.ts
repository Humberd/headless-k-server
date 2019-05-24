import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { StatusRepositoryService } from './status-repository.service';
import { AppStatus, StatusUpdateRequest } from './_models/status.dto';
import { TokensService } from '../tokens/tokens.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, switchMap, takeUntil } from 'rxjs/operators';
import { time } from '../utils';
import { NotificationService } from '../_shared/notification.service';

@Injectable()
export class StatusService implements OnModuleInit, OnModuleDestroy {
  private readonly DISCONNECT_TIME_INTERVAL = 1;
  private readonly logger = new Logger(StatusService.name);

  private readonly destroy$ = new Subject();
  private readonly status$ = new BehaviorSubject<StatusUpdateRequest>(null);

  constructor(private repository: StatusRepositoryService,
              private tokensService: TokensService,
              private notificationService: NotificationService) {

  }

  onModuleInit() {
    this.listenDisconnectedChange();
    this.listenForError();
  }

  private listenDisconnectedChange() {
    this.status$
        .pipe(
            takeUntil(this.destroy$),
            filter(Boolean),
            debounceTime(time(this.DISCONNECT_TIME_INTERVAL, 'minutes')),
            switchMap(() => this.sendDisconnectNotification())
        )
        .subscribe();
  }

  private listenForError() {
    this.status$
        .pipe(
            takeUntil(this.destroy$),
            filter(Boolean),
            distinctUntilChanged((x: StatusUpdateRequest, y: StatusUpdateRequest) => x.status === y.status),
            filter((it: StatusUpdateRequest) => it.status === AppStatus.FATAL_ERROR),
            switchMap(it => this.sendFatalErrorNotification(it.message))
        )
        .subscribe();
  }

  onModuleDestroy() {
    this.destroy$.next();
  }

  async save(data: StatusUpdateRequest) {
    this.status$.next(data);
    return await this.repository.save(data);
  }

  private async sendDisconnectNotification() {
    this.logger.log('Worker is probably disconnected');

    await this.notificationService.sendWorkerDisconnected(this.DISCONNECT_TIME_INTERVAL);
  }

  private async sendFatalErrorNotification(error: string) {
    this.logger.log('Worker has Fatal Error');

    await this.notificationService.sendWorkerFatalError(error);
  }

  async read() {
    return this.repository.read();
  }

}
