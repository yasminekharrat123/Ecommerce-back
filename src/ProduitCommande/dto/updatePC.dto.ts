import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class UpdateProduitCommandeDTO
{
    @IsNotEmpty()
    @Type(()=>Number)
    @IsNumber()
    id:number
    @IsNotEmpty()
    @IsString()
    etat:string
}