import { Entity, ManyToOne, PrimaryGeneratedColumn, Column, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Document } from './document.entity';

@Entity()
export class Download {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    downloadedAt: Date;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'userID' })
    user: User;

    @ManyToOne(() => Document)
    @JoinColumn({ name: 'documentID' })
    document: Document;
}
