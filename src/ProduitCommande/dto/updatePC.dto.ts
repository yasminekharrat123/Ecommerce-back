import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class UpdateProduitCommandeDTO
{

    @IsNotEmpty()
    @IsString()
    etat:string
}