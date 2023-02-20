import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddCommercantDto } from './dto/add-commercant.dto';
import { CommercantEntity } from './entities/commercant.entity';

@Injectable()
export class CommercantService {
  constructor(
    @InjectRepository(CommercantEntity)
    private  commercantRepository: Repository<CommercantEntity>,
  ) {}

  async addCommercant(commercant: AddCommercantDto): Promise<CommercantEntity> {
    return await this.commercantRepository.save(commercant);
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

  async updateCommercant(id: number, newCommercant: Partial<AddCommercantDto>) {
    const commercant = await this.getCommercantById(id);
    commercant.name = newCommercant.name ? newCommercant.name : commercant.name;
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
