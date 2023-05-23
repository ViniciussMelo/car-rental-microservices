import { Sequelize } from 'sequelize-typescript';

import { IDatabaseConfigAttributes } from '@configs/interfaces/sequelize.interface';
import { databaseConfig } from '@configs/database/sequelize.config';
import { Car } from '@modules/cars/models/car.model';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      let config: IDatabaseConfigAttributes;
      switch (process.env.NODE_ENV) {
        case 'DEVELOPMENT':
          config = databaseConfig.development;
          break;
        case 'TEST':
          config = databaseConfig.test;
          break;
        default:
          config = databaseConfig.development;
      }
      const sequelize = new Sequelize(config as any);
      sequelize.addModels([Car]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
