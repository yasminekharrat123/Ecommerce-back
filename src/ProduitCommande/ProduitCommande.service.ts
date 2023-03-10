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
    ){}

    async AddProduitCommande(newPC:Partial<ProduitCommandeEntity>)
    {   
        await this.ProduitCommandeRepository.save(newPC)
    }

    async getProduitCommandeByCommercant(idComm:number)
    {
        const query = `
            SELECT pc.* , p.*  FROM produit_commande pc
            INNER JOIN produit p  ON p.id = pc.produitId
            INNER JOIN commercant c ON c.id = p.commercantId
            WHERE c.id = ?
            `;
        return await this.ProduitCommandeRepository.query(query,[idComm]);
    }
    async updateProduitCommande(id:number,state:string)
    {
        const query = `
                UPDATE produit_commande
                SET etat = ?
                where id = ?
                `;
        return await this.ProduitCommandeRepository.query(query,[state,id]);
    }
}