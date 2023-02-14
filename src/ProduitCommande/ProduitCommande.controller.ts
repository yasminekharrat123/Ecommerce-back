import { ProduitCommandeService } from './ProduitCommande.service';
import { ProduitService } from './../produit/produit.service';
import { Controller } from '@nestjs/common';
@Controller('ProduitCommande')
export class ProduitCommandeController {
    constructor(private ProduitCommandeService:ProduitCommandeService){}
    
}