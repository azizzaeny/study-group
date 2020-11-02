import { HttpException, HttpStatus } from '@nestjs/common';

export interface IHttpMessage {
  message: string,
  docs_url?: string,
};

export type IResponseS<T> = {
  message: string,
  success: true;
  value: T,
}

export type IResponseF<T> = {
  success: false,
  type: string,
  error: T,
}

export function success<T>(msg: string, value?: T, logging?: boolean): IResponseS<T> {
  if (!logging) {
    try {
      let offR = JSON.parse(JSON.stringify(value));
      if (offR && offR.token) offR.token = "*****";
      console.log(new Date().toString() + '-[IResponseS]:' + JSON.stringify(offR));
    } catch (error) { }
  }
  return <IResponseS<T>>{
    success: true,
    message: msg,
    value: value
  }
}

export function failure<T>(msg: string, value?: T): IResponseF<T> {
  console.warn(new Date().toString() + '- [IResponseF]:' + msg + (value ? ' - ' + JSON.stringify(value) : ''));
  return <IResponseF<T>>{
    success: false,
    type: msg,
    error: value
  }
}
export function exception(msg: string, status?:any): HttpException {
  return new HttpException(msg, status);
}

export function refer_docs(url: string): IHttpMessage {
  return {
    message: 'To use this services, please read documentation ',
    docs_url: url
  }
}

export function response(result){
  if(result.error){
    return failure(result.error, result.status);
  }else{
    return success(result.msg, result.value);
  }
}

export type IResponse<T> = IResponseF<T> | IResponseS<T>| HttpException;
