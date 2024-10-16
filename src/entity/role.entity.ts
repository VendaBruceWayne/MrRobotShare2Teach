/*# License
This project is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License. See the [LICENSE](LICENSE) file for details
*/
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Permission } from "./permission.entity";

@Entity({ name: 'roles' })
export class Role {
    @PrimaryGeneratedColumn({ type: 'int' })
    id!: number; // Non-null assertion added here

    @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
    name!: string; // Non-null assertion added here

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
    permissions!: Permission[]; // Removed the array initialization
}