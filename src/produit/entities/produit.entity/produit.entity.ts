import { ManyToOne } from 'typeorm';
import { CommercantEntity } from './../../../commercant/entities/commercant.entity';
import { FavorisEntity } from 'src/favoris/entities/favoris.entity';
import { ProduitCommandeEntity } from './../../../ProduitCommande/entities/ProduitCommande.entity';

import { TimestampEntities } from '../../Generics/timestamp.entities';
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


  @ManyToOne(()=> CommercantEntity)
  commercant: CommercantEntity;

  
  @ManyToMany(() => FavorisEntity)
  @JoinTable()
  favoris: FavorisEntity[];
}
