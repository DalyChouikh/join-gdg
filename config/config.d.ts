import { Dialect } from 'sequelize';

interface DatabaseConfigWithCredentials {
  username: string;
  password: string;
  database: string;
  host: string;
  port: number;
  dialect: Dialect;
}

interface DatabaseConfigWithUrl {
  use_env_variable: string;
  dialect: Dialect;
}

interface Config {
  development: DatabaseConfigWithCredentials;
  test: DatabaseConfigWithCredentials;
  production: DatabaseConfigWithUrl;
}

declare const config: Config;
export = config;
