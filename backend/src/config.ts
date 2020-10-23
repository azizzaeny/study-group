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
    host: "",
    port: 465,
    secure: true,
    auth:{
      user: "",
      pass: ""
    }
  },
  json: {
    limit: '4mb',
    extended: true
  },
  jwt:{
    salt: "secret",
    expiresIn: 36000000
  }
});
