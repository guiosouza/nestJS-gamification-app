import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserLevelDto } from './dto/create-user-level.dto';
import { UserLevel } from 'src/entities/userLevel.entity';
import { UpdateUserLevelDto } from './dto/update-user-level.dto';

@Injectable()
export class UserLevelService {
    constructor(
        @InjectRepository(UserLevel)
        private userLevelRepository: Repository<UserLevel>,
    ) {}

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
        const userLevel = await this.userLevelRepository.findOne({ where: { id } });
        if (!userLevel) {
            throw new NotFoundException(`Nível de usuário com ID ${id} não encontrado`);
        }
        return userLevel;
    }

    async update(id: number, updateUserLevelDto: UpdateUserLevelDto): Promise<{ message: string, data: UserLevel }> {
        const userLevel = await this.findOne(id); 
        Object.assign(userLevel, updateUserLevelDto);
        const updatedUserLevel = await this.userLevelRepository.save(userLevel);

        return {
            message: `Nível de usuário com ID ${id} atualizado com sucesso`,
            data: updatedUserLevel,
        };
    }

    async remove(id: number): Promise<{ message: string }> {
        const userLevel = await this.findOne(id); 
        await this.userLevelRepository.remove(userLevel);

        return { message: `Nível de usuário com ID ${id} removido com sucesso` };
    }
}
