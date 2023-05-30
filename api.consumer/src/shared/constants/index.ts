import * as dotenv from 'dotenv';

dotenv.config();

export const KAFKA_CAR_RENTED_TOPIC = process.env.KAFKA_CAR_RENTED_TOPIC;
export const KAFKA_CAR_DEVOLUTION_TOPIC =
  process.env.KAFKA_CAR_DEVOLUTION_TOPIC;
