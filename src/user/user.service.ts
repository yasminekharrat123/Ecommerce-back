import { CommercantService } from './../commercant/commercant.service';
import { ClientService } from './../client/client.service';
import { RegisterDTO } from './dto/register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { Injectable, ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private  userRepository: Repository<UserEntity>,
    private clientService: ClientService,
    private CommercantService: CommercantService
  ) {}
    async Register(newUser: RegisterDTO): Promise<Partial<UserEntity>> {
    const {agent,name,password,email,NomService}=newUser;
    const newagent=  {
        name,
        password,
        email,
        salt:''
    }

    newagent.salt=await bcrypt.genSalt();
    newagent.password=await bcrypt.hash(newagent.password,newagent.salt);


    try
    {
      const UserRow=await this.userRepository.save(newagent);
      if(agent==='commercant') return await this.CommercantService.RegisterCommercant(UserRow,NomService)
      else return await this.clientService.RegisterClient(UserRow);
    }
    catch(e)
    {
      throw new ConflictException('Email or username already exists');
    }
    
     
  }
}