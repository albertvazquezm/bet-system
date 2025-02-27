import { Sequelize } from 'sequelize';
import { LogLevel, logService } from './log.service';
import { config } from '../../config';

export class SequelizeService {
  private sequelize: Sequelize;

  constructor() {
    this.sequelize = new Sequelize({
      dialect: 'postgres',
      host: config.db.host,
      port: config.db.port,
      username: config.db.user,
      password: config.db.password,
      database: config.db.database,
      logging: (msg) => logService.log({
        level: LogLevel.DEBUG,
        message: msg,
      }),
    });
  }

  getInstance() {
    return this.sequelize;
  }

  isConnected() {
    return this.sequelize.authenticate()
      .then(() => {
        logService.log({
          level: LogLevel.INFO,
          message: 'Connection has been established successfully.',
        });
        return true;
      })
      .catch((err) => {
        logService.log({
          level: LogLevel.ERROR,
          message: 'Unable to connect to the database:',
          error: err,
        });
        return false;
      });
  }
}

export const sequelizeService = new SequelizeService();
