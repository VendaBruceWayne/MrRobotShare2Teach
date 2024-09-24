import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany, JoinTable  } from 'typeorm';
import { User } from "./user.entity";
import { Rating } from "./rate.entity";
import { Tag } from "./tag.entity";

@Entity()
export class Resource {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    pdf: string;

    
    @ManyToOne(() => User, user => user.resources)
    user: User;

    @OneToMany(() => Rating, rating => rating.resource)
    ratings: Rating[];

     // Define the many-to-many relationship with tags
     @ManyToMany(() => Tag, tag => tag.resources)
     @JoinTable() // Creates a join table to manage the relationship
     tags: Tag[];
    
}
