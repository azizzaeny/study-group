import { Document, Model, Schema } from "mongoose";
import { IAuth, auth_schema } from './../../domain/auth';

export interface IAuthDocument extends IAuth, Document { };
export interface IAuthModel extends Model<IAuthDocument> { }

export const AuthSchema = new Schema(auth_schema());
