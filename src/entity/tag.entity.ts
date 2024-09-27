/*# License
This project is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License. See the [LICENSE](LICENSE) file for details
*/
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Resource } from "./resource.entity";

@Entity()
export class Tag {
    @PrimaryGeneratedColumn()
    id!: number; // Use the `!` operator to assert it will be assigned

    @Column()
    name!: string; // Use the `!` operator if this field is required

    @ManyToMany(() => Resource, resource => resource.tags)
    resources!: Resource[]; // Use `!` operator for definite assignment
}
