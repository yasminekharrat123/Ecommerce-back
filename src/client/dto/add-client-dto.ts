import { IsNotEmpty, IsString } from 'class-validator';

export class AddClientDto {
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
  description: string;

  @IsString()
  image: string;
}
