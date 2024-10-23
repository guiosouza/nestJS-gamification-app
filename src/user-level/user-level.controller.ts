import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UserLevelService } from './user-level.service';
import { CreateUserLevelDto } from './dto/create-user-level.dto';
import { UserLevel } from 'src/entities/userLevel.entity';

@Controller('user-levels')
export class UserLevelController {
    constructor(private readonly userLevelService: UserLevelService) { }

    @Post()
    async create(@Body() createUserLevelDto: CreateUserLevelDto) {
        return await this.userLevelService.create(createUserLevelDto);
    }

    @Get()
    async findAll(): Promise<UserLevel[]> {
      return this.userLevelService.findAll(); // Retorna todos os níveis
    }
  
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<UserLevel> {
      return this.userLevelService.findOne(id); // Retorna um nível específico
    }

}
