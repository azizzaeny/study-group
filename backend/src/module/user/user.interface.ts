import { Document, Model, Schema } from "mongoose";
import { IUser, user_schema } from './../../domain/user';

export interface IUserDocument extends IUser, Document {

};
export interface IUserModel extends Model<IUserDocument> { };

export const UserSchema = new Schema(user_schema());
