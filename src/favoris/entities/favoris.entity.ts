import { ClientEntity } from 'src/client/entities/client.entity';
import { ProduitEntity } from 'src/produit/entities/produit.entity/produit.entity';
import {
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Timestamp,
} from 'typeorm';

@Entity({ name: 'favoris', schema: 'public' })
export class FavorisEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToMany(() => ProduitEntity, (produit) => produit.favoris, {
    cascade: true,
    nullable: true,
    eager: true,
  })
  @JoinTable()
  produits: ProduitEntity[];
}
