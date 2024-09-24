import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Resource } from "./resource.entity";

@Entity()
export class Tag {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(() => Resource, resource => resource.tags)
    resources: Resource[];
}
