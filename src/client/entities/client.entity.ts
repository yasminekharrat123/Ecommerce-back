import { FavorisEntity } from 'src/favoris/entities/favoris.entity';
import { ProduitPanierEntity } from 'src/produit-panier/entities/produit-panier.entity';
import { TimestampEntities } from 'src/produit/Generics/timestamp.entities';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
  OneToMany,
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

  @OneToMany(() => ProduitPanierEntity, (ProduitPanier) => ProduitPanier.client)
  Panier: ProduitPanierEntity[];

  @OneToOne(() => FavorisEntity)
  @JoinColumn()
  favoris: FavorisEntity;
}
