import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Badge } from '../entities/badge.entity';
import { CreateBadgeDto } from './dto/create-badge.dto';
import { BadgeDto } from './dto/badge.dto';
import { UpdateBadgeDto } from './dto/update-badge.dto';

@Injectable()
export class BadgeService {
  constructor(
    @InjectRepository(Badge)
    private badgeRepository: Repository<Badge>,
  ) { }

  async create(createBadgeDto: CreateBadgeDto): Promise<{ message: string, createdBadge: Badge }> {

    const existingBadge = await this.badgeRepository.findOne({
      where: { title: createBadgeDto.title },
    });

    if (existingBadge) {
      throw new BadRequestException('Este nome de patente já existe.');
    }

    const badge = this.badgeRepository.create(createBadgeDto);
    const createdBadge = await this.badgeRepository.save(badge);

    return {
      message: 'Badge criado com sucesso.',
      createdBadge,
    };
  }

  async findAll(): Promise<BadgeDto[]> {
    return this.badgeRepository.find();
  }

  async findOne(id: number): Promise<BadgeDto> {
    const badge = await this.badgeRepository.findOne({ where: { id } });

    if (!badge) {
      throw new NotFoundException(`Badge com o ID ${id} não encontrado.`);
    }

    return badge;
  }

  async update(id: number, updateBadgeDto: UpdateBadgeDto): Promise<{ message: string, updatedBadge: Badge }> {

    const badge = await this.badgeRepository.findOne({ where: { id } });

    if (!badge) {
      throw new NotFoundException(`Badge com ID ${id} não encontrado.`);
    }


    Object.assign(badge, updateBadgeDto);


    const updatedBadge = await this.badgeRepository.save(badge);

    return {
      message: `Badge com ID ${id} atualizado com sucesso.`,
      updatedBadge,
    };
  }

  async delete(id: number): Promise<{ message: string }> {
    const badge = await this.badgeRepository.findOne({ where: { id } });

    if (!badge) {
      throw new NotFoundException(`Badge com ID ${id} não encontrado.`);
    }

    await this.badgeRepository.remove(badge);

    return { message: `Badge com ID ${id} foi removido com sucesso.` };
  }


}
