// src/entity/resource.entity.ts

import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Rating } from './rating.entity';

@Entity('resources')  // Ensure the table name is correct
export class Resource {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @OneToMany(() => Rating, (rating) => rating.resource)
    ratings: Rating[];
}