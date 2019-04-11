import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Day } from './models/day.interface';

@Injectable()
export class DaysService {
  constructor(@InjectModel('Day') private readonly dayModel: Model<Day>) {
  }

  async createEmpty(day: number) {
    const createdDay = new this.dayModel();

    createdDay.day = day;
    createdDay.jobs = {};

    return createdDay.save();
  }

}
