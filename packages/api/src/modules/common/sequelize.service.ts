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

  checkConnection() {
    return this.sequelize.authenticate();
  }
}

export const sequelizeService = new SequelizeService();
