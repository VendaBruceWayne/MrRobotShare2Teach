import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role.entity";
import { Resource } from "./resource.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column({
        unique: true,
    })
    email: string;

    @Column() 
    password: string;

    @ManyToOne(() => Role)
    @JoinColumn({ name: 'role_id' })
    role: Role;

    
    @OneToMany(() => Resource, resource => resource.user)
    resources: Resource[];
    
}
