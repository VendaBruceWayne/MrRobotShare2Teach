import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { User } from "./user.entity";
import { Document } from "./document.entity";

@Entity()
export class View{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    viewStart: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    viewEnd: Date;

    @Column()
    duration: number

    @ManyToOne(() => User)
    @JoinColumn({name: 'userID'})
    user: User;

    @ManyToOne(() => Document)
    @JoinColumn({name: 'documentID'})
    document: Document;

}
