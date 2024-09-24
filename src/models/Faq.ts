import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'faqs',
  timestamps: true, // If you want createdAt and updatedAt columns
})
export class Faq extends Model<Faq> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  question!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  answer!: string;
}