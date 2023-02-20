import { ClientEntity } from './../../client/entities/client.entity';
import { ProduitCommandeEntity } from './../../ProduitCommande/entities/ProduitCommande.entity';
import { Column, CreateDateColumn, Entity, OneToMany, ManyToOne, PrimaryGeneratedColumn, TableForeignKey } from "typeorm";

@Entity('commande')
export class CommandeEntity {
    @PrimaryGeneratedColumn()
    id:number;
    @CreateDateColumn({update: false})
    createdAt: Date;    
    @ManyToOne(()=>ClientEntity,(client)=>client.orders)
    client:ClientEntity;
    @OneToMany(()=>ProduitCommandeEntity, (pro_coms)=>pro_coms.commande)
    pro_coms: ProduitCommandeEntity[];
}
