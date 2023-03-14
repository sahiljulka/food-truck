module.exports = {
  username: "postgres",
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE || "foodtruckdb",
  dialect: "postgres",
  protocol: "postgres",
};
