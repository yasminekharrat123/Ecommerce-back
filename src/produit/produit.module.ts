import { CommercantModule } from './../commercant/commercant.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProduitEntity } from './entities/produit.entity/produit.entity';
import { ProduitController } from './produit.controller';
import { ProduitService } from './produit.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProduitEntity]),CommercantModule],
  controllers: [ProduitController],
  providers: [ProduitService],
  exports:[ProduitService]
})
export class ProduitModule {}
