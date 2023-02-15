import { addProduitDto } from './../produit/dto/add-produit.dto';
import { ProduitCommandeService } from './ProduitCommande.service';
import { ProduitService } from './../produit/produit.service';
import { Body, Controller, Param, Patch, Post, ParseIntPipe } from '@nestjs/common';
import { AddProduitCommandeDTO } from './dto/addPC.dto';
@Controller('ProduitCommande')
export class ProduitCommandeController {
    constructor(private ProduitCommandeService:ProduitCommandeService){}
    @Post()
    async addProduitCommande(
        // @Body() newPC: AddProduitCommandeDTO
    )
    {
        return await this.ProduitCommandeService.AddProduitCommande();
    }
    @Patch(':id')
    async updateProduitCommande(
        @Param('id',ParseIntPipe) id:number, 
        @Body('state') state:string
    )
    {
        return await this.ProduitCommandeService.updateProduitCommande(id,state);
    }
}