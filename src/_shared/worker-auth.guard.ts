import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { IncomingMessage } from 'http';

@Injectable()
export class WorkerAuthGuard implements CanActivate {
  canActivate(
      context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<IncomingMessage>();

    if (!request.headers.authorization) {
      return false;
    }
    return request.headers.authorization === process.env.WORKER_TOKEN;
  }
}
