import { ProduitEntity } from 'src/produit/entities/produit.entity/produit.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { PanierEntity } from './panier.entity';

@Entity('produit_panier')
export class ProduitPanierEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantite: number;

  @ManyToOne(() => ProduitEntity)
  produit: ProduitEntity;
}
