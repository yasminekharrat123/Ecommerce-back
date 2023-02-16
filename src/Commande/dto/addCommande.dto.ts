import { PrimaryColumn } from 'typeorm';
import { AddProduitCommandeDTO } from './../../ProduitCommande/dto/addPC.dto';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber } from "class-validator";



export class AddCommandeDTO
{
    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    idClient: number
    @IsNotEmpty()
    products: AddProduitCommandeDTO[]    
}