export default () => ({
  http: {
    host: process.env.http_host || "<server-url>",
    port: process.env.http_port || 3000
  },
  db: {
    host: "127.0.0.1",
    port: "27017",
    user: null,
    pass: null,
    database: "study-group-db",
    authSource: null
  },
  mail: {
    host: "<smtp-host>",
    port: "<port>",
    secure: false,
    user: "<username>",
    pass: "<password>"
  }
});
