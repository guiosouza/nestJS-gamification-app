import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserLevel } from 'src/entities/userLevel.entity';
import { Badge } from 'src/entities/badge.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(UserLevel)
    private userLevelRepository: Repository<UserLevel>,
    @InjectRepository(Badge)
    private badgeRepository: Repository<Badge>,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
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
    user.expNeededToLevelUp = nextLevel.expRequired - user.totalExp;

    const savedUser = await this.userRepository.save(user);

    return savedUser;
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find({ 
      relations: ['badge', 'tasks'] 
    });
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['tasks', 'badge'],
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found.`);
    }
    return user;
  }

}
