import { addProduitDto } from './../produit/dto/add-produit.dto';
import { ProduitCommandeService } from './ProduitCommande.service';
import { ProduitService } from './../produit/produit.service';
import { Body, Controller, Patch, Post } from '@nestjs/common';
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
    async modifyProduitCommande(
        @Body('state') state:string
    )
    {
        
    }
}