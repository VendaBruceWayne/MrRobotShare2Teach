import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()  
export class Permission {
    @PrimaryGeneratedColumn({ type: 'int' })
    id!: number; // Non-null assertion added

    @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
    name!: string; // Non-null assertion added
}
