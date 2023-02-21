import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';

@Entity('user')
export class UserEntity  {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  name: string;

  @Column(
    {
      unique: true,
    }
  )
  email: string;

  @Column()
  password: string;

  @Column()
  salt: string;
}