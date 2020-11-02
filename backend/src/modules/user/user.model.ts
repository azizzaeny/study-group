import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';
import * as urlsafe from 'urlsafe-base64';
import Mongoose, { Document, Model, Schema, model } from "mongoose";

export type IUserStatus = 'pending' | 'active';
export type IUserMethod = 'members'   | 'admin';
export type IUserRoles  = 'user'    | 'user_admin';
// TODO: use enums

export interface IUserAuth{
  password: string;
  method: IUserMethod;
  roles: IUserRoles[];
  verify_token: string|any;
  reset_token: string;
}

export interface IUserProfilePic {
  url: string;
  file_blob: string;
};

export interface IUser {
  first_name: string;
  last_name: string;
  email: string;
  phone: number;
  validated_email: boolean;
  last_updated: Date;
  created_at: Date;
  status: IUserStatus;
  auth: IUserAuth | any;
  profile_pic: IUserProfilePic;
}

export interface IUserDocument extends IUser, Document{};
export interface IUserModel extends Model<IUserDocument>{};

export const UserSchema: Schema =new Schema({
  first_name: String,
  last_name: String,
  email: String,
  phone: Number,
  last_updated: Date,
  created_at: Date,
  status: String,
  validated_email: Boolean,
  auth: {
    password: String,
    method: String,
    roles: Array,
    verify_token: String,
    reset_token: String
  },
  profile_pic:{
    url: String,
    file_blob: String
  }
});

// model<IUserDocument>('user',userSchema) as IUserModel;

export function validEmailPattern(email: string)
: boolean {
  if (email) {
    let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(email);
  } else {
    return false;
  }
}

export async function generatePassword(txt: string, saltRounds:number): Promise<any>{
  return await bcrypt.hash(txt, saltRounds);
}

export function randomDigit(): string{
  return (Math.floor(Math.random() * (9000000)) + 1000000).toString();
}

export function encode64(str: string):string{
  return urlsafe.encode(new Buffer(str))
}

export function decode64(str: string):string{
  return urlsafe.decode(str).toString();
}

export function signHash(str, salt){
  return crypto.createHash('md5').update(str+salt).digest("hex");
}

export function checkHash(hash, str, salt): boolean{
  return (hash === signHash(str, salt));
}

export async function generateEmailToken(email: string, salt: string){
  let timestamp = Date.now();
  let md5Email = encode64(email);
  let token = randomDigit();
  let signHashed = signHash(email, salt)
  let token_time = md5Email+'.'+token +'.'+ timestamp+'.'+signHashed;
  return token_time;
}

export async function generateResetToken(email: string, salt: string){
  let timestamp = Date.now();
  let md5Email = encode64(email);
  let hash = signHash(email, salt);
  let token = md5Email+'.'+hash+'.'+ timestamp;
  return token;
}

export  function aroundMinute(stamped: any): number{
  return ((new Date().getTime() - stamped) / 60000);
}

export function isEmpty(arr){
  if (typeof arr !== 'undefined' && arr.length > 0) {
    return false;
  }else{
    return true;
  }
}

export async function comparePassword(p, pa){
  return await bcrypt.compare(p, pa);
}

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
  token: string
): Promise<any>{
  const record = await doc.findOne({
    'email': email,
    'auth.verify_token': token
  });
  return record;
}

export async function findByIdAndResetToken(
  doc: IUserModel,
  id: number | any,
  token?: string): Promise<IUserDocument>{
  const record = await doc.findOne({ _id: id });
  return record;
}


const pass_salt_rounds = 10;
const user_salt = 'myappsecret'; //TODO: dont store here

export function updateLastTouch(
  last?: Date | null
):any{
  const now = new Date();
  if(!last || last < now){
    return now;
  }
  return last;
}



export async function updatePassword(
  doc: any, email: string, new_password: string):Promise<any>{
  
  let crypted_pass = await generatePassword(new_password, pass_salt_rounds);
  
  let record = await doc.updateOne(
    { email: email },
    { $set:{ auth: { password: crypted_pass},
	     last_updated: new Date(),
	     reset_token: ''
	   } });
  
  console.log(record);
  
  if(record.ok ==1){
    return { email: email}
  }else{
    return false;
  }
}



export async function findResetToken(doc: any, email, token){
  let record = doc.findOne({
    email: email,    
    'auth.reset_token': token
  });
  return record;
}


export async function updateVerifyToken(
  doc: any, email: string)
: Promise<any>{
  const newToken = await generateEmailToken(email, user_salt);
  let updated = await doc.updateOne(
    { email: email, },
    { $set: { auth: {verify_token: newToken },
	      last_updated: new Date(),
	    }
    });

  if(updated.ok == 1){
    return { auth: {verify_token: newToken}, email: email };
  }else{
    return null;
  }
}



export async function updateResetToken(
  doc: any,
  email: string
) : Promise<any> { 
  const newToken = await generateResetToken(email, user_salt);
  const record =  await doc.updateOne({email: email},{
    $set: { auth : { reset_token: newToken },
	    last_updated: new Date()
	  }
  });
  if(record.ok == 1){
    return {
      email: email,
      auth:{
	reset_token: newToken
      }
    }
  }else{
    return false;
  }
}


export async function createUser(doc: any, isuer: any): Promise<any>{
  
  const generatedNewPassword = await generatePassword(isuer.password, pass_salt_rounds);
  const generatedEmailToken = await generateEmailToken(isuer.email, user_salt);
  
  let new_auth = {
    auth:{
      password: generatedNewPassword,
      method: 'members',
      roles: ['user'],
      verify_token: generatedEmailToken,
      reset_token: ''
    }
  };
  
  let new_meta = {
    last_updated: new Date(),
    created_at: new Date(),
    status: 'pending',
    validated_email: false,
  };

  let new_user = Object.assign(
    {},
    {
      first_name: isuer.first_name || '',
      last_name: isuer.last_name || '',
      email: isuer.email,
      phone: isuer.phone || ''	
    },
    new_meta,
    new_auth);
  
  let created = new doc(new_user);
  await created.save();
  return created;
}

export async function activateUser(doc: any, email: string, token: string){
  
  let record = await doc.updateOne(
    { email: email, },
    { $set: { auth: {verify_token:'' },
	      
	      last_updated: new Date(),
	      status: 'active',
	      validated_email: true
	    }
    });

  if(record.ok == 1){
    return {email: email, auth : {verify_token: token} , status: 'active'}
  }else{
    return false;
  }
}

export async function updateProfilePicture(doc: any, email, profile){
  let record = await doc.updateOne({
    email: email
  },{
    $set:{
      profile_pic :{
	url: profile.pic_url,
	last_updated: new Date()
      }
    }
  });

  if(record.ok ==1){
    return { email: email}
  }else{
    return false;
  }
}

export async function updateProfile(doc: any, email, profile){
  let record  = await doc.updateOne({
    email: email
  },{
    $set :{
      first_name: profile.first_name,
      last_name: profile.last_name,
      phone: profile.phone,
      last_updated: new Date()
    }
  });

  if(record.ok == 1){
    return { email: email }
  }else{
    return false;
  }
}

export async function deleteUser(doc: any, id){
  return await doc.findOneAndDelete({_id: id});
}

export async function deleteUserByEmail(doc, email){
  return await doc.findOneAndDelete({ email: email});
}

export async function upsertUser(doc, profile){

  let email = profile.email;
  let password = await await generatePassword(profile.password, pass_salt_rounds);
  
  let user = await doc.findOneAndUpdate({
    email: profile.email
  },{
    auth: {
      password: password,
      method: profile.method,
      roles: profile.roles,
      verify_token: '',
      reset_token: ''
    },
    email: profile.email,
    last_updated: new Date(),
    created_at: new Date(),
    status: profile.status,
    validated_email: profile.validated_email,
    first_name: profile.first_name,
    last_name: profile.last_name,
    phone: profile.phone,    
  }, {
    upsert: true
  });
  
  if(user){
    return {  email: user.email  }
  }else{
    false;
  }
 
};
