import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Resource } from "./resource.entity";

@Entity()
export class Rating {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    score: number; // Rating score between 1-5

    @Column()
    comment: string; // Optional comment by the user

    @ManyToOne(() => Resource, resource => resource.ratings, { onDelete: 'CASCADE' })
    resource: Resource;
}
