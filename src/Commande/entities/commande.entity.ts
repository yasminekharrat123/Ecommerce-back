import { ProduitCommandeEntity } from './../../ProduitCommande/entities/ProduitCommande.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, TableForeignKey } from "typeorm";

@Entity('commande')
export class CommandeEntity {
    @PrimaryGeneratedColumn()
    id:number;
    @CreateDateColumn({update: false})
    createdAt: Date;    
    @Column()
    idClient:number;
    @OneToMany(()=>ProduitCommandeEntity, (pro_coms)=>pro_coms.commande)
    pro_coms: ProduitCommandeEntity[];
}
