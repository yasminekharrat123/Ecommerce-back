import { CommandeService } from './../Commande/commande.service';
import { ProduitModule } from './../produit/produit.module';
import { ProduitService } from './../produit/produit.service';

import { AddProduitCommandeDTO } from './dto/addPC.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProduitCommandeEntity } from './entities/ProduitCommande.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CommandeEntity } from 'src/Commande/entities/commande.entity';
@Injectable()
export class ProduitCommandeService {
    constructor(
        @InjectRepository(ProduitCommandeEntity)
        private ProduitCommandeRepository: Repository<ProduitCommandeEntity>,
        private ProduitService:ProduitService,
        private CommandeService:CommandeService
    ){}

    async AddProduitCommande():Promise<ProduitCommandeEntity>
    {   
        const newPC:AddProduitCommandeDTO={
            quantite:1,
            commande: await this.CommandeService.findCommandeById(1),
            produit: await this.ProduitService.findProduitById(1),
        };
        return await this.ProduitCommandeRepository.save(newPC);
    }

    async updateProduitCommande(id:number,state:string)
    {
        // const qb=this.ProduitCommandeRepository.createQueryBuilder("produit_commande");
        // qb.update()
        // .set({etat:state})
        // .where("produit_commande.id = :id")
        // .setParameters({id})
        // .from(ProduitCommandeEntity, "produit_commande");   
        
        // const ex=await qb.execute()
        // console.log(qb.getSql());
        // return ex;
        const query = `
                UPDATE produit_commande
                SET etat = ?
                where id = ?
                `;
        return await this.ProduitCommandeRepository.query(query,[state,id]);
    }
}