export const environment = {
    production: true,
    domain_url: 'localhost' || process.env.DOMAIN_URL,
    port: 3000 || process.env.PORT,
    db_url: 'mongodb://localhost:14701/study-group' || process.env.DB_URL,
    salt_token: 'mysecreet' || process.env.SALT_TOKEN
};
