import { Sequelize, Dialect } from 'sequelize';
import config from '../config/config';
import initUser from './user';

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env as keyof typeof config];

interface DatabaseInterface {
  sequelize: Sequelize;
  Sequelize: typeof Sequelize;
  User: ReturnType<typeof initUser>;
  [key: string]: unknown;
}

const db: DatabaseInterface = {} as DatabaseInterface;

let sequelize: Sequelize;
if ('use_env_variable' in dbConfig) {
  sequelize = new Sequelize(process.env[dbConfig.use_env_variable]!, {
    dialect: dbConfig.dialect as Dialect,
  });
} else {
  sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    {
      host: dbConfig.host,
      port: dbConfig.port,
      dialect: dbConfig.dialect as Dialect,
    }
  );
}

// Initialize models
db.User = initUser(sequelize);

// Set up associations
Object.keys(db).forEach(modelName => {
  const model = db[modelName];
  if (model && typeof model === 'object' && 'associate' in model) {
    (model as { associate: () => void }).associate();
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
export { sequelize };
