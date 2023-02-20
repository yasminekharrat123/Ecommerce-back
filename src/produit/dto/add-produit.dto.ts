import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  MaxLength,
  IsNumber,
  Min,
} from 'class-validator';

export class addProduitDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  nom: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  description: string;


  @IsString()
  @MaxLength(255)
  image: string;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  prix: number;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  quantite: number;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  IdCommercant: number
}
