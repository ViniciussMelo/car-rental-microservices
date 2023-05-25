import {
  AutoIncrement,
  Column,
  DataType,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import { BaseModel } from '@shared/model/base.model';

@Table({ tableName: 'cars', paranoid: true })
export class Car extends BaseModel<Car> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @Column(DataType.STRING)
  name: string;

  @Column(DataType.STRING)
  description: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  available: boolean;

  @Column({
    type: DataType.STRING,
    field: 'license_plate',
  })
  licensePlate: string;

  @Column(DataType.STRING)
  brand: string;
}
