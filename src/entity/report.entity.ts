/*# License
This project is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License. See the [LICENSE](LICENSE) file for details
*/
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Report {
    @PrimaryGeneratedColumn()
    id: number = 0; // Initialize with default value

    @Column({ type: 'varchar', length: 255 })
    reportName: string = ''; // Initialize with empty string

    @Column({ type: 'varchar', length: 255 })
    metric: string = ''; // Initialize with empty string

    @Column({ type: 'int' })
    value: number = 0; // Initialize with default value

    @CreateDateColumn({ type: 'timestamp' })
    generatedAt: Date = new Date(); // Initialize with current date
}
