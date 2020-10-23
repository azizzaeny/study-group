import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';
import * as urlsafe from 'urlsafe-base64';

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
  // return Buffer.from(str).toString('base64');
  return urlsafe.encode(new Buffer(str))
}

export function decode64(str: string):string{
  //return Buffer.from(str, 'base64').toString('ascii');
  return urlsafe.decode(str);
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
