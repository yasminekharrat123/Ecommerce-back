import { Body, Controller, Get, Put,Param, Post,NotFoundException,Query } from '@nestjs/common';
import { AddCommercantDto } from './dto/add-commercant.dto';
import { GetPaginatedCommercantDto } from './dto/get-paginated-commercant.dto';
import { commercant } from './entities/commercant.entity';

@Controller('commercant')
export class CommercantController {

        constructor(){
           this.commercants = []
        }
    commercants: commercant[];

 // Récupérer la liste des commercant
    @Get()
    getCommercant(
    @Query() mesQueryParams: GetPaginatedCommercantDto,
    ) {}
  // Ajouter un commercant
  @Post()
  addcommercantt(
    @Body() newCommercant: AddCommercantDto
  ){
    const Commercant = new commercant();
    const {name,password,serviceName,image}= newCommercant;
    Commercant.name=name;
    Commercant.password=password;
    Commercant.serviceName=serviceName;
    Commercant.image=image;
    if (this.commercants.length){
        Commercant.idCommercant=this.commercants[this.commercants.length-1].idCommercant+1
    }
    else{
        Commercant.idCommercant=1;
    }
    this.commercants.push(Commercant);
    return Commercant;
  }

    @Get('/:idCommercant')
        getCommercantById(
            @Param('idCommercant') idCommercant
        ){
            const commercant= this.commercants.find((actualCommercant)=> actualCommercant.idCommercant===+idCommercant);
            if(commercant)
                return commercant;
            else 
                throw new NotFoundException(`le commercant d'id ${idCommercant} n'existe pas`);
            
        }
    

    @Post()
    addCommercant(
        @Body() newCommercant : commercant
    ){
        if (this.commercants.length){
            newCommercant.idCommercant=this.commercants[this.commercants.length-1].idCommercant+1
        }
        else{
            newCommercant.idCommercant=1;
        }
        this.commercants.push(newCommercant);
        return newCommercant;
    } 

    @Put(':idCommercant')
    updateCommercant(
        @Param ('idCommercant') idCommercant,
        @Body() newCommercant: Partial <AddCommercantDto>
    ){
        const commercant= this.getCommercantById(idCommercant);
        commercant.name= newCommercant.name ? newCommercant.name : commercant.name;
        commercant.image= newCommercant.image ? newCommercant.image : commercant.image;
        commercant.serviceName= newCommercant.serviceName? newCommercant.serviceName : commercant.serviceName;
        return (commercant);    
    }
        
}     
