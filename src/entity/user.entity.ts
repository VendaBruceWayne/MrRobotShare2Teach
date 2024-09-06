import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column({
        unique: true, // This ensures the email column is unique
    })
    email: string;

    @Column() 
    password: string;

    @ManyToOne(()=> Role)
    @JoinColumn({name: 'role_id'})
    role: Role;
}
