import { IsEmail, IsOptional, IsString, Min } from 'class-validator';



export class UpdateClientDTO
{
    @IsOptional()
    @IsEmail()
    email:string
    @IsOptional()
    @IsString()
    name: string
    @IsString()
    @IsOptional()
    image: string
    @IsString()
    @IsOptional()
    description:string

}