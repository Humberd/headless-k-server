import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export interface TokensDao extends Document {
  _id: string;
  fcmToken: string;
}

export const TokensSchema = new mongoose.Schema({
  _id: String,
  fcmToken: String
}, {timestamps: true});
