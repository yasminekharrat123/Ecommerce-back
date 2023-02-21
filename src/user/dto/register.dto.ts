import { IsNotEmpty, IsString, IsEmail, MinLength, IsOptional, IsEnum } from 'class-validator';

enum Agent {
    Buyer = 'client',
    Seller = 'commercant',
  } 



export class RegisterDTO
{
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;


    @IsNotEmpty()
    @MinLength(4)
    @IsString()
    name: string;
    
    
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password: string;

    @IsOptional()
    @IsString()
    NomService: string;

    @IsNotEmpty()
    @IsEnum(Agent)
    agent: Agent;

}