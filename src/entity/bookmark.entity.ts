import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { User } from "./user.entity";
import { Document } from "./document.entity";

@Entity()
export class Bookmark{
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @ManyToOne(() => User)
    @JoinColumn({name: 'userID'})
    user: User;

   @ManyToOne(() => Document)
   @JoinColumn({name: 'documentID'})
   document: Document;

}
