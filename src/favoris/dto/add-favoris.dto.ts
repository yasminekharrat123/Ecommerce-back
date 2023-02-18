import { Type } from 'class-transformer';
import { IsNumber, IsOptional, Min } from 'class-validator';

export class AddFavorisDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  idProduit: number;
}
