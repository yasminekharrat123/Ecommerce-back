import { CommandeController } from './../../Commande/commande.controller';
import { CommandeEntity } from './../../Commande/entities/commande.entity';
import { ProduitEntity } from './../../produit/entities/produit.entity/produit.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

enum ComState {
  EnCours = 'en_cours',
  ACCEPTED = 'acceptée',
  DECLINED = 'refusée',
}

@Entity('produit_commande')
export class ProduitCommandeEntity {
  @PrimaryGeneratedColumn()
  id: number;
  // @PrimaryColumn(['produit','commande'])
  @ManyToOne(() => ProduitEntity)
  produit: ProduitEntity;
  // @PrimaryColumn(['produit','commande'])
  @ManyToOne(() => CommandeEntity, (commande) => commande.pro_coms)
  commande: CommandeEntity;
  @Column()
  quantite: number;
  @Column({
    type: 'enum',
    enum: ComState,
    default: ComState.EnCours,
  })
  etat: string;
}
