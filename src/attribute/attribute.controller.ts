import { Controller, Post, Body } from '@nestjs/common';
import { AttributeService } from './attribute.service';
import { CreateAttributeDto } from './dto/create-attribute.dto';
import { Attribute } from 'src/entities/attribute.entity';

@Controller('attributes')
export class AttributeController {
  constructor(private readonly attributeService: AttributeService) {}

  @Post()
  async create(@Body() createAttributeDto: CreateAttributeDto): Promise<Attribute> {
    return this.attributeService.create(createAttributeDto);
  }
}
