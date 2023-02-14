import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { addProduitDto } from './dto/add-produit.dto';
import { ProduitEntity } from './entities/produit.entity/produit.entity';

@Injectable()
export class ProduitService {
  constructor(
    @InjectRepository(ProduitEntity)
    private ProduitRepository: Repository<ProduitEntity>,
  ) {}

  async getAllProduit(): Promise<ProduitEntity[]> {
    return await this.ProduitRepository.find();
  }

  async addProduit(produit: addProduitDto): Promise<ProduitEntity> {
    return await this.ProduitRepository.save(produit);
  }

  async removeProduit(id: number) {
    const produitToRemove = await this.findProduitById(id);
    return await this.ProduitRepository.remove(produitToRemove);
  }
  async findProduitById(id: number): Promise<ProduitEntity> {
    const produit = await this.ProduitRepository.findOne({
      where: { id },
    });
    if (!produit) {
      throw new NotFoundException(`Le produit d'id ${id} n'existe pas`);
    }
    return produit;
  }

  async deleteProduit(id: number) {
    return await this.ProduitRepository.delete(id);
  }

  async softDeleteProduit(id: number) {
    return await this.ProduitRepository.softDelete(id);
  }

  async restoreProduit(id: number) {
    return await this.ProduitRepository.restore(id);
  }
}
