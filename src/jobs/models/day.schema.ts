import * as mongoose from 'mongoose';

export const JobSchema = new mongoose.Schema({
  jobId: String,
  lastSuccess: {type: Number, min: 0},
  status: {type: String, uppercase: true},
});

export const DaySchema = new mongoose.Schema({
  day: Number,
  jobs: {
    type: Map,
    of: JobSchema,
  },
});
