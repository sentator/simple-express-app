import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Project } from './index';
@Entity()
export class Architect {
  @PrimaryGeneratedColumn()
  architector_id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  email: string;

  @Column()
  license: string;

  @ManyToMany(() => Project, (project) => project.architects)
  projects: Project[];
}
