import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
