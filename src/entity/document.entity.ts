import { Request, Response } from "express";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Document{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string

    @Column()
    bookmark: number

    @Column()
    view: number

    @Column()
    documentType: string

    @Column()
    download: number
    
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    uploadDate: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    lastViewed: Date;

    @Column()
    viewDuration: number

    @ManyToOne(() => User)
    @JoinColumn({name: 'userID'})
    user: User


}
