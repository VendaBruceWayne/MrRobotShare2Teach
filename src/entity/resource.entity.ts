import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Resource {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column()
    description!: string;

    @Column()
    pdf!: string;

    // Add fields for moderation status and moderatedBy user
    @Column({ default: 'pending' })
    moderationStatus!: 'pending' | 'approved' | 'rejected';

    @Column({ nullable: true })
    moderationComments?: string;

    @ManyToOne(() => User, user => user.resources)
    user!: User;

    @ManyToOne(() => User, { nullable: true })
    moderatedBy?: User; // The user who moderated the resource
}
