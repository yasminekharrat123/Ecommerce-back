import { ProduitService } from './../produit/produit.service';
import { ProduitCommandeService } from './../ProduitCommande/ProduitCommande.service';
import { AddCommandeDTO } from './dto/addCommande.dto';
import { CommandeEntity } from 'src/Commande/entities/commande.entity';
import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class CommandeService {
    constructor(
        @InjectRepository(CommandeEntity)
        private CommandeRepository: Repository<CommandeEntity>,
        private ProduitCommandeService: ProduitCommandeService,
        private ProduitService: ProduitService,
    ){}

    async addCommande(newCommande:AddCommandeDTO)
    {
        const CommandeRow = 
        {
          idClient:newCommande.idClient,
        }
        const Commande= await this.CommandeRepository.save(CommandeRow);
        newCommande.products.forEach( async (element) =>{
        const newPC={
            quantite: element.quantite,
            commande: Commande,
            produit:  await this.ProduitService.findProduitById(element.idProduit),
        };
        
           await this.ProduitCommandeService.AddProduitCommande(newPC)
        })
        return Commande;
       
    }

    async findCommandeById(id: number): Promise<CommandeEntity> {
        const commande = await this.CommandeRepository.findOne({
          where: { id },
        });
        if (!commande) {
          throw new NotFoundException(`La commande d'id ${id} n'existe pas`);
        }
        return commande;
      }

}