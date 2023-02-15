import { AddCommandeDTO } from './dto/addCommande.dto';
import { CommandeEntity } from 'src/Commande/entities/commande.entity';
import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class CommandeService {
    constructor(
        @InjectRepository(CommandeEntity)
        private CommandeRepository: Repository<CommandeEntity>
    ){}

    async addCommande(newCommande:AddCommandeDTO):Promise<CommandeEntity>
    {
        return await this.CommandeRepository.save(newCommande);
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