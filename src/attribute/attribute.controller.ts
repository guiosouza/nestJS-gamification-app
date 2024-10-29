import { Controller, Post, Body, Get, Param } from '@nestjs/common';
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

  @Get()
  async findAll(): Promise<Attribute[]> {
    return this.attributeService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<Attribute> {
    return this.attributeService.findById(id);
  }

}
