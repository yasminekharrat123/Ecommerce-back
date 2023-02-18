import { TimestampEntities } from 'src/produit/Generics/timestamp.entities';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';

@Entity({ name: 'commercant', schema: 'public' })
export class CommercantEntity extends TimestampEntities {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'bytea', nullable: true })
  image: Buffer;

  @Column()
  NomService: string;
  /*
  @OneToOne(() => PanierEntity)
  @JoinColumn()
  panier: PanierEntity;*/
}
