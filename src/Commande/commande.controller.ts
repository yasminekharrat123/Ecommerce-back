import { AddCommandeDTO } from './dto/addCommande.dto';
import { CommandeService } from './commande.service';
import { Controller, Post, Body, Get, ParseIntPipe, Param } from '@nestjs/common';
@Controller('Commande')
export class CommandeController {
    constructor(
        private CommandeService:CommandeService
    ){}

    @Post()
    async addCommande(
        @Body() newCommande: AddCommandeDTO 
    )
    {
        return await this.CommandeService.addCommande(newCommande)
    }
    @Get(':id')
    async findCommandeByID(
        @Param('id',ParseIntPipe) id:number,
    )
    {
        return await this.CommandeService.findCommandeById(id);
    }
}