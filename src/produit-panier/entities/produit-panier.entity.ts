import { ClientEntity } from 'src/client/entities/client.entity';
import { ProduitEntity } from 'src/produit/entities/produit.entity/produit.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('produit_panier')
export class ProduitPanierEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => ClientEntity, (client) => client.Panier)
  client: ClientEntity;

  @ManyToOne(() => ProduitEntity)
  produit: ProduitEntity;

  @Column()
  quantity: number;
}
