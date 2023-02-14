import { FavorisEntity } from 'src/favoris/entities/favoris.entity';
import { TimestampEntites } from 'src/Generics/timestamp.entites.';
import { PanierEntity } from 'src/panier/entities/panier.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'produit', schema: 'public' })
export class ProduitEntity extends TimestampEntites {
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
