import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserLevel } from 'src/entities/userLevel.entity';
import { Badge } from 'src/entities/badge.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(UserLevel)
    private userLevelRepository: Repository<UserLevel>,
    @InjectRepository(Badge)
    private badgeRepository: Repository<Badge>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User & { expNeededToLevelUp: number }> {
    try {
      const existingUser = await this.userRepository.findOne({ where: { name: createUserDto.name } });
  
      if (existingUser) {
        throw new BadRequestException('Nome de usuário já está em uso.');
      }
  
      const user = this.userRepository.create(createUserDto);
      user.level = 1;
      user.totalExp = 0;
  
      const noviceBadge = await this.badgeRepository.findOne({ where: { title: 'NOVICE' } });
      if (!noviceBadge) {
        throw new BadRequestException('Badge "NOVICE" não encontrado.');
      }
  
      user.badge = noviceBadge;
  
      const nextLevel = await this.userLevelRepository.findOne({ where: { level: user.level + 1 } });
      if (!nextLevel) {
        throw new BadRequestException('Erro ao calcular experiência para o próximo nível.');
      }
  
      const expNeededToLevelUp = nextLevel.expRequired - user.totalExp;
      const savedUser = await this.userRepository.save(user);
  
      return { ...savedUser, expNeededToLevelUp };
    } catch (error) {
      throw new BadRequestException('Erro ao tentar criar o usuário.');
    }
  }
  
  async findAll(): Promise<User[]> {
    try {
      return await this.userRepository.find({
        relations: ['badge', 'tasks'],
      });
    } catch (error) {
      throw new BadRequestException('Erro ao buscar a lista de usuários.');
    }
  }

  async findOne(id: number): Promise<User & { expNeededToLevelUp: number }> {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
        relations: ['tasks', 'badge'],
      });
      if (!user) {
        throw new NotFoundException(`Usuário com id ${id} não encontrado.`);
      }

      const nextLevel = await this.userLevelRepository.findOne({ where: { level: user.level + 1 } });
      if (!nextLevel) {
        throw new BadRequestException('Erro ao calcular experiência para o próximo nível.');
      }

      const expNeededToLevelUp = nextLevel.expRequired - user.totalExp;

      return { ...user, expNeededToLevelUp };
    } catch (error) {
      throw new BadRequestException('Erro ao buscar o usuário.');
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<{ message: string; user: User }> {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
    
      if (!user) {
        throw new NotFoundException(`Usuário com id ${id} não encontrado.`);
      }

      if ('badge' in updateUserDto) {
        throw new BadRequestException('O campo "badge" não pode ser atualizado diretamente.');
      }

      Object.assign(user, updateUserDto);

      const updatedUser = await this.userRepository.save(user);

      return { 
        message: 'Usuário atualizado com sucesso.',
        user: updatedUser,
      };
    } catch (error) {
      throw new BadRequestException('Erro ao tentar atualizar o usuário.');
    }
  }

  async delete(id: number): Promise<{ message: string }> {
    try {
      const user = await this.userRepository.findOne({ where: { id } });

      if (!user) {
        throw new NotFoundException(`Usuário com id ${id} não encontrado.`);
      }

      await this.userRepository.remove(user);

      return { message: 'Usuário deletado com sucesso.' };
    } catch (error) {
      throw new BadRequestException('Erro ao tentar deletar o usuário.');
    }
  }
}
