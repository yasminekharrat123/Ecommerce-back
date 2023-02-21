import { UserEntity } from './../user/entities/user.entity';
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateCommercantDto } from './dto/update-commercant.dto';
import { CommercantEntity } from './entities/commercant.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CommercantService {
  constructor(
    @InjectRepository(CommercantEntity)
    private  commercantRepository: Repository<CommercantEntity>,
  ) {}

  async RegisterCommercant(user:UserEntity,NomService:string): Promise<Partial<CommercantEntity>> {
      const newCommercant={
        user,
        NomService
      }
      return await this.commercantRepository.save(newCommercant);
  }

  async getCommercants(): Promise<CommercantEntity[]> {
    return await this.commercantRepository.find();
  }

  async getCommercantById(id: number): Promise<CommercantEntity> {
    const commercant = await this.commercantRepository.findOne({
      where: { id },
    });
    if (!commercant) {
      throw new NotFoundException(`Le commercant d'id ${id} n'existe pas`);
    }
    return commercant;
  }

  async SoftdeleteCommercant(id: number) {
    return await this.commercantRepository.softDelete(id);
  }

  async restoreCommercant(id: number) {
    return await this.commercantRepository.restore(id);
  }

  async updateCommercant(id: number, newCommercant: UpdateCommercantDto) {
    const commercant = await this.getCommercantById(id);
    commercant.user.name = newCommercant.name ? newCommercant.name : commercant.user.name;
    commercant.image = newCommercant.image
      ? newCommercant.image
      : commercant.image;
    commercant.NomService = newCommercant.NomService
      ? newCommercant.NomService
      : commercant.NomService;

    this.commercantRepository.save(commercant);

    return commercant;
  }
}
