import {IUserDocument, IUserModel } from './entity';

export async function findByEmail(
  doc: IUserModel,
  email: string
): Promise<IUserDocument>{
  const record  = await doc.findOne({email: email});
  return record;
}

export async function findAll(
  doc: IUserModel
): Promise<any>{
  return await doc.find().exec();
}

export async function findById(
  doc: IUserModel,
  id: string | any
): Promise<IUserDocument>{
  const record = await doc.findById(id);
  return record;
}

export async function findEmailAndToken(
  doc: IUserModel,
  email: string,
  token?: string
): Promise<any>{
  const record = await doc.find({email: email, auth:{ verify_token: token}});
  return record;
}

export async function findByIdAndResetToken(
  doc: IUserModel,
  id: number | any,
  token?: string): Promise<IUserDocument>{
  const record = await doc.findOne({ _id: id });
  return record;
}
