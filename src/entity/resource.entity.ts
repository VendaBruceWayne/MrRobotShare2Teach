/*# License
This project is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License. See the [LICENSE](LICENSE) file for details
*/
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, OneToMany, JoinTable } from 'typeorm';
import { User } from './user.entity';
import { Rating } from './rate.entity'; // Import the Rating entity
import { Tag } from './tag.entity'; // Import the Tag entity

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

    // Add ratings relationship, allow nullable/empty array
    @OneToMany(() => Rating, rating => rating.resource, { nullable: true })
    ratings?: Rating[] | null; // Ratings can be null or an empty array

    // Add tags relationship, allow nullable/empty array
    @ManyToMany(() => Tag, tag => tag.resources, { nullable: true })
    @JoinTable() // Required for ManyToMany relations
    tags?: Tag[] | null; // Tags can be null or an empty array
}
