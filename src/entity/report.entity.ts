import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Report {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    reportName: string; // e.g., "user_registration_report"

    @Column()
    metric: string; // e.g., "total_registrations"

    @Column()
    value: number; // e.g., 100 for total registrations

    @CreateDateColumn({ type: 'timestamp' })
    generatedAt: Date; // When this report was generated
}
