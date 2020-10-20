export interface IDBConfig {
  host: string,
  port: string,
  user: string | null,
  pass: string | null,
  database: string,
  authSource: string | null
};

export function db_url(conf: IDBConfig): string {
  let user_string = (conf.user && conf.pass)
    ? (conf.user + ':' + conf.pass + '@')
    : '';
  let auth_source = (conf.authSource)
    ? ('?authSource=' + conf.authSource + '&w=1')
    : '';
  let db_string = 'mongodb://' + user_string + conf.host + ':' + (conf.port || '27017') + '/' + conf.database + auth_source;
  return db_string;
}
