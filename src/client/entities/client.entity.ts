import { TimestampEntities } from 'src/produit/Generics/timestamp.entities';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';

@Entity({ name: 'client', schema: 'public' })
export class ClientEntity extends TimestampEntities {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  description: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  image: string;

  /*
  @OneToOne(() => FavorisEntity)
  @JoinColumn()
  favoris: FavorisEntity;

  @OneToOne(() => PanierEntity)
  @JoinColumn()
  panier: PanierEntity;*/
}
