import { ProduitEntity } from 'src/produit/entities/produit.entity/produit.entity';
import { Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';

@Entity({ name: 'panier', schema: 'public' })
export class PanierEntity {
  @ManyToMany(() => ProduitEntity, (produit) => produit.panier, {
    cascade: true,
    nullable: true,
    eager: true,
  })
  @JoinTable()
  produits: ProduitEntity[];

  @OneToMany(() => ClientEntity, (client) => client.panier, {
    cascade: true,
    nullable: false,
    eager: true,
  })
  client: ClientEntity;
}
