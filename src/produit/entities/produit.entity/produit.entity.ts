import { ProduitCommandeEntity } from './../../../ProduitCommande/entities/ProduitCommande.entity';



import { TimestampEntities } from '../../Generics/timestamp.entities';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

  @OneToMany(()=>ProduitCommandeEntity, (pro_coms)=>pro_coms.produit)
  pro_coms: ProduitCommandeEntity[];
}
