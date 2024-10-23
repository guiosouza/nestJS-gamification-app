import { Controller, Post, Body, Get, Param, Delete, ParseIntPipe, Patch } from '@nestjs/common';
import { UserLevelService } from './user-level.service';
import { CreateUserLevelDto } from './dto/create-user-level.dto';
import { UserLevel } from 'src/entities/userLevel.entity';
import { UpdateUserLevelDto } from './dto/update-user-level.dto';

@Controller('user-levels')
export class UserLevelController {
  constructor(private readonly userLevelService: UserLevelService) { }

  @Post()
  async create(@Body() createUserLevelDto: CreateUserLevelDto) {
    return this.userLevelService.create(createUserLevelDto);
  }

  @Get()
  async findAll(): Promise<UserLevel[]> {
    return this.userLevelService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<UserLevel> {
    return this.userLevelService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserLevelDto: UpdateUserLevelDto,
  ) {
    return this.userLevelService.update(id, updateUserLevelDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.userLevelService.remove(id);
  }

}
