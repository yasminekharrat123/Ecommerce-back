import { Module } from '@nestjs/common';
import { CommercantController } from './commercant.controller';

@Module({
  controllers: [CommercantController]
})
export class CommercantModule {}
