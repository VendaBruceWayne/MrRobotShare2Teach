import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Resource } from "./resource.entity";

@Entity()
export class Rating {
    @PrimaryGeneratedColumn()
    id!: number; // Use the `!` operator to assert it will be assigned

    @Column()
    score!: number; // Use the `!` operator if this field is required

    @Column({ nullable: true })
    comment!: string; // You can mark `comment` as nullable since it's optional

    @ManyToOne(() => Resource, resource => resource.ratings, { onDelete: 'CASCADE' })
    resource!: Resource; // Assert this will be assigned
}
