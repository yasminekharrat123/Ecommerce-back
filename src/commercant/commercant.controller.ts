import {
  Body,
  Controller,
  Get,
  Put,
  Param,
  Post,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { AddCommercantDto } from './dto/add-commercant.dto';
import { CommercantService } from './commercant.service';
import { ParseIntPipe } from '@nestjs/common';

@Controller('commercant')
export class CommercantController {
  constructor(private readonly commercantService: CommercantService) {}

  @Get()
  async getAllCommercants() {
    return this.commercantService.getCommercants();
  }
  @Post()
  async addCommercant(@Body() AddCommercantDto: AddCommercantDto) {
    return this.commercantService.addCommercant(AddCommercantDto);
  }

  @Get('/:id')
  getCommercantById(@Query('id', ParseIntPipe) id: number) {
    return this.commercantService.getCommercantById(id);
  }

  @Put('/:id')
  async updateCommercant(
    @Query('id', ParseIntPipe) id: number,
    @Body() newCommercant: Partial<AddCommercantDto>,
  ) {
    return this.commercantService.updateCommercant(id, newCommercant);
  }
}
