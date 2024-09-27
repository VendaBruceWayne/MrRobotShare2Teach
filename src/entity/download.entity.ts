/*# License
This project is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License. See the [LICENSE](LICENSE) file for details
*/
import { Entity, ManyToOne, PrimaryGeneratedColumn, Column, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Document } from './document.entity';

@Entity()
export class Download {
    @PrimaryGeneratedColumn()
    id!: number; // Assert this will be assigned later

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    downloadedAt!: Date; // Assert this will be assigned later

    @ManyToOne(() => User)
    @JoinColumn({ name: 'userID' })
    user!: User; // Add `!` for definite assignment

    @ManyToOne(() => Document)
    @JoinColumn({ name: 'documentID' })
    document!: Document; // Add `!` for definite assignment
}
