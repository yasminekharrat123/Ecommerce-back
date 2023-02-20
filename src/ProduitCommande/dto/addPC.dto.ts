import { CommandeEntity } from 'src/Commande/entities/commande.entity';
import { ProduitEntity } from './../../produit/entities/produit.entity/produit.entity';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, isNumber, Min } from "class-validator";

export class AddProduitCommandeDTO
{

    @IsNotEmpty()
    @Type(()=>Number)
    @IsNumber()
    idProduit:number
    @Type(()=>Number)
    @IsNumber()
    @Min(1)
    @IsNotEmpty()
    quantite:number;

}