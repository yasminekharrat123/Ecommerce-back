import { UpdateProduitCommandeDTO } from './dto/updatePC.dto';
import { addProduitDto } from './../produit/dto/add-produit.dto';
import { ProduitCommandeService } from './ProduitCommande.service';
import { ProduitService } from './../produit/produit.service';
import { Body, Controller, Param, Patch, Post, Get, ParseIntPipe } from '@nestjs/common';
import { AddProduitCommandeDTO } from './dto/addPC.dto';
@Controller('ProduitCommande')
export class ProduitCommandeController {
    constructor(private ProduitCommandeService:ProduitCommandeService){}

    @Get(':id')
    async getProduitCommandeByCommercant(@Param('id',ParseIntPipe) id:number)
    {
        return await this.ProduitCommandeService.getProduitCommandeByCommercant(id);
    }

    @Patch(':id')
    async updateProduitCommande(
        @Param('id',ParseIntPipe) id:number, 
        @Body() UpdateProduitCommandeDTO:UpdateProduitCommandeDTO
    )
    {
        return await this.ProduitCommandeService.updateProduitCommande(id,UpdateProduitCommandeDTO.etat);
    }
}