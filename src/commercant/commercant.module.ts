import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommercantController } from './commercant.controller';
import { CommercantService } from './commercant.service';
import { CommercantEntity } from './entities/commercant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CommercantEntity])],
  controllers: [CommercantController],
  providers: [CommercantService],
})
export class CommercantModule {}
