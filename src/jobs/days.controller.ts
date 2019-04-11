import { Controller, Param, Post } from '@nestjs/common';
import { DaysService } from './days.service';

@Controller('days')
export class DaysController {

  constructor(private readonly daysService: DaysService) {
  }

  @Post(':day')
  async createNewDay(@Param('day') day: string) {
    const foo = await this.daysService.createEmpty(Number(day));
    return foo.id;
  }
}
