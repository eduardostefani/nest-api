import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('book')
export class BookEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column()
  public isbn: string;
}
