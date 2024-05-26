import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Architect {
  @PrimaryGeneratedColumn()
  architector_id: number = 0;

  @Column()
  first_name: string = '';

  @Column()
  last_name: string = '';

  @Column()
  email: string = '';

  @Column()
  license: string = '';
}
