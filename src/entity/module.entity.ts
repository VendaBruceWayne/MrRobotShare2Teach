import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Resource } from './resource.entity'; // Import the Resource entity

@Entity()
export class Module {
    @PrimaryGeneratedColumn()
    id!: number; // Unique identifier for each module

    @Column()
    name!: string; // Name of the module

    // Establishing a ManyToMany relationship with Resource
    @ManyToMany(() => Resource, resource => resource.modules)
    resources?: Resource[]; // Resources associated with this module
}
