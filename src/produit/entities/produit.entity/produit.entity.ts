import { FavorisEntity } from 'src/favoris/entities/favoris.entity';
import { ProduitCommandeEntity } from './../../../ProduitCommande/entities/ProduitCommande.entity';

import { TimestampEntities } from '../../Generics/timestamp.entities';
import { PanierEntity } from 'src/panier/entities/panier.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'produit', schema: 'public' })
export class ProduitEntity extends TimestampEntities {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, update: false })
  nom: string;

  @Column({ length: 500, update: false })
  description: string;

  @Column()
  prix: number;

  @Column()
  image: string;

  @Column({ type: 'int' })
  quantite: number;

  @OneToMany(() => ProduitCommandeEntity, (pro_coms) => pro_coms.produit)
  pro_coms: ProduitCommandeEntity[];

  @ManyToMany(() => FavorisEntity, {
    cascade: true,
    nullable: true,
    eager: true,
  })
  @JoinTable()
  favoris: FavorisEntity[];

  @ManyToMany(() => PanierEntity, {
    cascade: true,
    nullable: true,
    eager: true,
  })
  @JoinTable({
    name: 'produits dans panier',
    joinColumn: {
      name: 'produit_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'panier_id',
      referencedColumnName: 'id',
    },
  })
  panier: PanierEntity[];
}
