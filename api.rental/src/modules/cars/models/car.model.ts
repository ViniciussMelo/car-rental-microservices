import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Car extends Model {
  @Column
  name: string;
}
