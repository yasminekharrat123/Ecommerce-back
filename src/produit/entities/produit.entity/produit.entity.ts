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

  @ManyToMany(() => FavorisEntity)
  @JoinTable()
  favoris: FavorisEntity[];

  @ManyToMany(() => PanierEntity)
  @JoinTable()
  panier: PanierEntity[];
}
