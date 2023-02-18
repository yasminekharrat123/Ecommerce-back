import { IsNotEmpty, IsString } from 'class-validator';

export class AddCommercantDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  NomService: string;

  @IsString()
  @IsNotEmpty()
  image: Buffer;
}
