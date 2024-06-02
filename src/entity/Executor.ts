import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Project } from './index';

@Entity()
export class Executor {
  @PrimaryGeneratedColumn()
  executor_id: number = 0;

  @Column()
  first_name: string = '';

  @Column()
  last_name: string = '';

  @Column()
  email: string = '';

  @OneToMany(() => Project, (project) => project.executor)
  project: Project | null = null;
}
