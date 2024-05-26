import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ProjectStatus } from '../types';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  project_id: number = 0;

  @Column()
  name: string = '';

  @Column({
    type: 'enum',
    enum: ['not_started', 'in_progress', 'completed'],
    default: 'not_started',
  })
  status: ProjectStatus = 'not_started';

  @Column({
    type: 'varchar',
    nullable: true,
    default: null,
  })
  executor_id: string | null = null;

  @Column()
  architectors_quantity: number = 0;
}
