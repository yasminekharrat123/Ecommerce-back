import { InjectRepository } from '@nestjs/typeorm';
import { ProduitCommandeEntity } from './entities/ProduitCommande.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
@Injectable()
export class ProduitCommandeService {
    constructor(
        @InjectRepository(ProduitCommandeEntity)
        private ProductRepository: Repository<ProduitCommandeEntity>
    ){}
}