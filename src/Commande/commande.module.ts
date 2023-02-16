import { ProduitService } from './../produit/produit.service';
import { ProduitModule } from './../produit/produit.module';
import { ProduitCommandeService } from './../ProduitCommande/ProduitCommande.service';
import { ProduitCommandeModule } from './../ProduitCommande/ProduitCommande.module';
import { AddProduitCommandeDTO } from './../ProduitCommande/dto/addPC.dto';
import { CommandeEntity } from './entities/commande.entity';
import { CommandeService } from './commande.service';
import { CommandeController } from './commande.controller';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [TypeOrmModule.forFeature([CommandeEntity]),ProduitCommandeModule ,ProduitModule],
  controllers: [CommandeController],
  providers: [CommandeService],
})
export class CommandeModule {}
