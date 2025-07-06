const config = {
  development: {
    username: process.env.DB_USERNAME || "gdg_admin",
    password: process.env.DB_PASSWORD || "gdg_secure_password_2025",
    database: process.env.DB_NAME || "gdg_recruitment",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432"),
    dialect: "postgres",
  },
  test: {
    username: process.env.DB_USERNAME || "gdg_admin",
    password: process.env.DB_PASSWORD || "gdg_secure_password_2025",
    database: process.env.DB_NAME_TEST || "gdg_recruitment_test",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432"),
    dialect: "postgres",
  },
  production: {
    use_env_variable: "DATABASE_URL",
    dialect: "postgres",
  },
};

module.exports = config;
