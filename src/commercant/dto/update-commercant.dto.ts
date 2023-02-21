import { IsNotEmpty, IsString, IsEmail, IsOptional, Min } from 'class-validator';

export class UpdateCommercantDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsEmail()
  @IsOptional()
  email: string;




  @IsString()
  @IsOptional()
  NomService: string;

  @IsString()
  @IsOptional()
  image: string;
}
