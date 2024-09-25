import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Permission } from "./permission.entity";

@Entity({ name: 'roles' })
export class Role {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
    name: string;

    @ManyToMany(() => Permission, { eager: true, cascade: true })
    @JoinTable({
        name: 'role_permissions',
        joinColumn: {
            name: 'role_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'permission_id',
            referencedColumnName: 'id'
        }
    })
    permissions: Permission[];
}