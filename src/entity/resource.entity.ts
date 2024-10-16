import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, OneToMany, JoinTable } from 'typeorm';
import { User } from './user.entity';
import { Rating } from './rate.entity'; // Import the Rating entity
import { Tag } from './tag.entity'; // Import the Tag entity
import { Module } from './module.entity'; // Import the Module entity

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

    @Column({ type: 'text', nullable: true }) // Use 'text' for longer comments
    moderationComments!: string | null

    @ManyToOne(() => User, user => user.resources)
    user!: User;  

    @ManyToOne(() => User, { nullable: true })
    moderatedBy?: User; // The user who moderated the resource

    // Add ratings relationship, allow nullable/empty array
    @OneToMany(() => Rating, rating => rating.resource, { nullable: true })
    ratings?: Rating[] | null; // Ratings can be null or an empty array

    // Add tags relationship, allow nullable/empty array
    @ManyToMany(() => Tag, tag => tag.resources, { nullable: true })
    @JoinTable() // Required for ManyToMany relations
    tags?: Tag[] | null; // Tags can be null or an empty array

    // Add modules relationship, allow nullable/empty array
    @ManyToMany(() => Module, module => module.resources, { nullable: true })
    @JoinTable() // Required for ManyToMany relations
    modules?: Module[] | null; // Modules can be null or an empty array
}
