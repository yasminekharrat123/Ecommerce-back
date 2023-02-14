import { ProduitEntity } from 'src/produit/entities/produit.entity/produit.entity';
import {
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  Timestamp,
} from 'typeorm';

@Entity({ name: 'favoris', schema: 'public' })
export class FavorisEntity {
  @ManyToMany(() => ProduitEntity, (produit) => produit.favoris, {
    cascade: true,
    nullable: true,
    eager: true,
  })
  @JoinTable()
  produits: ProduitEntity[];

  @OneToOne(() => ClientEntity, (client) => client.favoris, {
    cascade: true,
    nullable: false,
    eager: true,
  })
  client: ClientEntity;
}
