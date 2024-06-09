import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  RelationId,
} from 'typeorm';
import { ProjectStatus } from '../types';
import { Architect, Executor } from './index';

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

  @ManyToOne(() => Executor, (executor) => executor.project)
  @JoinTable()
  executor: Executor | null = null;

  @RelationId((project: Project) => project.executor)
  executor_id: Executor['executor_id'] | null = null;

  @ManyToMany(() => Architect)
  @JoinTable()
  architects: Architect[] | null = null;

  @Column({
    type: 'int',
    default: 0,
    nullable: false,
  })
  spending: number = 0;
}
