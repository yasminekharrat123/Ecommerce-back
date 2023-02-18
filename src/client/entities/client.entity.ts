import { FavorisEntity } from 'src/favoris/entities/favoris.entity';
import { PanierEntity } from 'src/panier/entities/panier.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('client')
export class ClientEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: String;

  @Column()
  email: String;

  @Column()
  description: String;

  @Column()
  image: String;

  @Column()
  password: String;

  @OneToOne(() => FavorisEntity)
  @JoinColumn()
  favoris: FavorisEntity;
}
