import * as mongoose from 'mongoose';
import { Document, SchemaTimestampsConfig } from 'mongoose';

export interface StatusDao extends Document {
  _id: string;
  version: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export const StatusSchema = new mongoose.Schema({
  _id: String,
  version: String,
  status: String,
}, {timestamps: true});
