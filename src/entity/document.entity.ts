/*# License
This project is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License. See the [LICENSE](LICENSE) file for details
*/
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Document {
    @PrimaryGeneratedColumn()
    id!: number; // Assert this will be assigned later

    @Column()
    title!: string; // Ensure this is a required field

    @Column()
    bookmark!: number;

    @Column()
    view!: number;

    @Column()
    documentType!: string;

    @Column()
    download!: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    uploadDate!: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    lastViewed!: Date;

    @Column()
    viewDuration!: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'userID' })
    user!: User; // Add `!` for definite assignment
}
