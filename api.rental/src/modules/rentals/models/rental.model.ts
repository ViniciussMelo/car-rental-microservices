import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import { BaseModel } from '@shared/model/base.model';
import { Car } from '@modules/cars/models/car.model';

@Table({ tableName: 'rentals', paranoid: true })
export class Rental extends BaseModel<Rental> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @Column({
    type: DataType.INTEGER,
    field: 'user_id',
  })
  userId: number;

  @ForeignKey(() => Car)
  @Column({
    type: DataType.INTEGER,
    field: 'car_id',
  })
  carId: number;

  @Column({
    type: DataType.DATE,
    field: 'start_date',
  })
  startDate: Date;

  @Column({
    type: DataType.DATE,
    field: 'end_date',
  })
  endDate: Date;

  @Column(DataType.INTEGER)
  total: number;

  @BelongsTo(() => Car, 'carId')
  user: Car;
}
