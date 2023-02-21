import { UserEntity } from './../../user/entities/user.entity';
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
  @OneToOne(()=>UserEntity)
  @JoinColumn()
  user: UserEntity;
  
  @Column({ nullable: true })
  image: string;

  @Column()
  NomService: string;
  /*
  @OneToOne(() => PanierEntity)
  @JoinColumn()
  panier: PanierEntity;*/
}
