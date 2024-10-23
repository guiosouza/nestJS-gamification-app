import { Controller, Post, Body, Get, Param, Patch, Delete, ParseIntPipe } from '@nestjs/common';
import { BadgeService } from './badge.service.js';
import { CreateBadgeDto } from './dto/create-badge.dto.js';
import { BadgeDto } from './dto/badge.dto.js';
import { UpdateBadgeDto } from './dto/update-badge.dto.js';


@Controller('badges')
export class BadgeController {
  constructor(private readonly badgeService: BadgeService) { }

  @Post()
  async createBadge(@Body() createBadgeDto: CreateBadgeDto): Promise<{ message: string; createdBadge: any }> {
    return this.badgeService.create(createBadgeDto);
  }

  @Get()
  async findAll(): Promise<BadgeDto[]> {
    return this.badgeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<BadgeDto> {
    return this.badgeService.findOne(id);
  }

  @Patch(':id')
  async updateBadge(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBadgeDto: UpdateBadgeDto,
  ): Promise<{ message: string; updatedBadge: any }> {
    return this.badgeService.update(id, updateBadgeDto);
  }

  @Delete(':id')
  async deleteBadge(@Param('id', ParseIntPipe) id: number) {
    return this.badgeService.delete(id);
  }


}
