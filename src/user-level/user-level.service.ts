// user-level.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserLevelDto } from './dto/create-user-level.dto';
import { UserLevel } from 'src/entities/userLevel.entity';

@Injectable()
export class UserLevelService {
    constructor(
        @InjectRepository(UserLevel)
        private userLevelRepository: Repository<UserLevel>,
    ) { }

    async create(createUserLevelDto: CreateUserLevelDto): Promise<{ message: string, data: UserLevel }> {
        const newUserLevel = this.userLevelRepository.create(createUserLevelDto);

        const savedUserLevel = await this.userLevelRepository.save(newUserLevel);

        return {
            message: 'Nível de usuário criado com sucesso',
            data: savedUserLevel
        };
    }

    async findAll(): Promise<UserLevel[]> {
        return this.userLevelRepository.find();
    }

    async findOne(id: number): Promise<UserLevel> {
        const userLevel = await this.userLevelRepository.findOne(({ where: { id } }));
        if (!userLevel) {
            throw new NotFoundException(`Nível de usuário com ID ${id} não encontrado`);
        }
        return userLevel;
    }
}