export default () => ({
  port: process.env.PORT,
  redis_host: process.env.REDIS_HOST,
  redis_port: process.env.REDIS_PORT,
  db_port: process.env.DB_PORT,
  db_host: process.env.DB_HOST,
  db_user: process.env.DB_USER,
  db_password: process.env.DB_PASSWORD,
  db_name: process.env.DB_NAME,
  jwt_secret: process.env.JWT_SECRET,
  jwt_expires: process.env.JWT_EXPIRES,
});
