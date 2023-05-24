import { config } from 'dotenv';
config();

export const USER_REPOSITORY = 'USER_REPOSITORY';

export const USER_TOKEN_REPOSITORY = 'USER_TOKEN_REPOSITORY';

export const APP_INTERCEPTOR = 'APP_INTERCEPTOR';

export const SEQUELIZE = 'SEQUELIZE';

export const JWT_SECRET_TOKEN = process.env.JWT_SECRET_TOKEN;
export const JWT_EXPIRES_IN_TOKEN = process.env.JWT_EXPIRES_IN_TOKEN;

export const JWT_EXPIRES_IN_REFRESH_TOKEN =
  process.env.JWT_EXPIRES_IN_REFRESH_TOKEN;
export const JWT_SECRET_REFRESH_TOKEN = process.env.JWT_SECRET_REFRESH_TOKEN;
