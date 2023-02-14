import { Module } from '@nestjs/common';
import { FavorisService } from './favoris.service';
import { FavorisController } from './favoris.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavorisEntity } from './entities/favoris.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FavorisEntity])],
  providers: [FavorisService],
  controllers: [FavorisController],
})
export class FavorisModule {}
