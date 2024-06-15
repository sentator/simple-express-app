import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  JoinColumn,
} from 'typeorm';
import { ProjectStatus } from '../types';
import { Architect, Executor } from './index';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  project_id: number;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: ['not_started', 'in_progress', 'completed'],
    default: 'not_started',
  })
  status: ProjectStatus;

  @ManyToOne(() => Executor, (executor) => executor.projects)
  @JoinColumn({ name: 'executor_id' })
  executor: Executor | null;

  @ManyToMany(() => Architect, (architect) => architect.projects)
  @JoinTable()
  architects: Architect[] | null;
}
