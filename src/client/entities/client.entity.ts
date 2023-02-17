import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';

@Entity({ name: 'client', schema: 'public' })
export class client {
  @PrimaryGeneratedColumn()
  idClient: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  description: string;

  @Column()
  password: string;

  @Column({ type: 'bytea', nullable: true })
  image: Buffer;

  @OneToOne(() => FavorisEntity)
  @JoinColumn()
  favoris: FavorisEntity;

  @OneToOne(() => PanierEntity)
  @JoinColumn()
  panier: PanierEntity;
}
