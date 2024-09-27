import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Document } from "./document.entity";

@Entity()
export class Bookmark {
    @PrimaryGeneratedColumn()
    id!: number; // Use `!` to assert this will be assigned later

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date; // Use `!` to assert this will be assigned later

    @ManyToOne(() => User)
    @JoinColumn({ name: 'userID' })
    user!: User; // Add `!` for definite assignment

    @ManyToOne(() => Document)
    @JoinColumn({ name: 'documentID' })
    document!: Document; // Add `!` for definite assignment
}
