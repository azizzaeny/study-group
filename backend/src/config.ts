export default () => ({
  http: {
    host: process.env.http_host || "<server-url>",
    port: process.env.http_port || 3000
  },
  db: {
    host: "",
    port: "27017",
    user: "",
    pass: "",
    database: "",
    authSource: ""
  },
  mail: {
    host: "<smtp-host>",
    port: "<port>",
    secure: false,
    user: "<username>",
    pass: "<password>"
  }
});
