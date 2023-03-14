module.exports = {
  username: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || "5432",
  database: process.env.DB_DATABASE || "foodtruckdb",
  dialect: "postgres",
  protocol: "postgres",
};
