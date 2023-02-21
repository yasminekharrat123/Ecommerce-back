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
import { UpdateCommercantDto } from './dto/update-commercant.dto';
import { CommercantService } from './commercant.service';
import { ParseIntPipe } from '@nestjs/common';

@Controller('commercant')
export class CommercantController {
  constructor(private readonly commercantService: CommercantService) {}

  @Get()
  async getAllCommercants() {
    return this.commercantService.getCommercants();
  }
  // @Post()
  // async RegisterCommercant(@Body() commercant: AddCommercantDto) {
  //   return this.commercantService.RegisterCommercant(commercant);
  // }

  @Get('/:id')
  getCommercantById(@Query('id', ParseIntPipe) id: number) {
    return this.commercantService.getCommercantById(id);
  }

  @Put('/:id')
  async updateCommercant(
    @Query('id', ParseIntPipe) id: number,
    @Body() newCommercant: UpdateCommercantDto,
  ) {
    return this.commercantService.updateCommercant(id, newCommercant);
  }
}
