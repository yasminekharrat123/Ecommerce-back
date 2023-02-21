import { CommercantModule } from './../commercant/commercant.module';
import { ClientModule } from './../client/client.module';
import { ClientEntity } from 'src/client/entities/client.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserEntity } from './entities/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]),ClientModule,CommercantModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
