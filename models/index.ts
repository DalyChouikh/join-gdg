import { Sequelize } from 'sequelize';
import config from '../config/database';

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env as keyof typeof config];

interface DatabaseInterface {
  sequelize: Sequelize;
  Sequelize: typeof Sequelize;
  [key: string]: unknown;
}

const db: DatabaseInterface = {} as DatabaseInterface;

let sequelize: Sequelize;
if (dbConfig.use_env_variable) {
  sequelize = new Sequelize(process.env[dbConfig.use_env_variable]!, dbConfig);
} else {
  sequelize = new Sequelize(
    dbConfig.database!,
    dbConfig.username!,
    dbConfig.password!,
    dbConfig
  );
}

// Import models here when they are created
// Example: 
// import User from './user';
// db.User = User;

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
export { sequelize };
