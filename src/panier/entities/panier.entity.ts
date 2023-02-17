import { ClientEntity } from 'src/client/entities/client.entity';
import { ProduitEntity } from 'src/produit/entities/produit.entity/produit.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProduitPanierEntity } from './produitPanier.entity';

@Entity({ name: 'panier', schema: 'public' })
export class PanierEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToMany(() => ProduitPanierEntity, {
    cascade: true,
    nullable: true,
    eager: true,
  })
  @JoinTable()
  produitsPanier: ProduitPanierEntity[];
}
