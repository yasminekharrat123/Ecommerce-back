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
}