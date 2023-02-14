import { ProduitCommandeService } from './ProduitCommande.service';
import { ProduitCommandeEntity } from './entities/ProduitCommande.entity';
import { ProduitCommandeController } from './ProduitCommande.controller';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [TypeOrmModule.forFeature([ProduitCommandeEntity])],
  controllers: [ProduitCommandeController],
  providers: [ProduitCommandeService],
})
export class ProduitCommandeModule {}
