import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from "./user.entity";

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
    
}
