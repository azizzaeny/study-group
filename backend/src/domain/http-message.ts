export interface IHttpMessage {
  msg: string
};

export function refer_docs(url: string): IHttpMessage {
  return {
    msg: 'To use this services, please read documentation at ' + url
  }
}
