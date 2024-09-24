import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'faqs',
  timestamps: true,
})
export class Faq extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  question!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  answer!: string;
}
