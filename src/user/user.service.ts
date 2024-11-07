import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../entities/user-entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) { }

  async create(createUserDto: CreateUserDto) {
    try {
      const user = this.userRepository.create(createUserDto);
      const savedUser = await this.userRepository.save(user);
      return {
        message: 'Usuário criado com sucesso!',
        user: savedUser
      };
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.userRepository.find() || [];
    } catch (error) {
      console.error('Error finding users:', error);
      return [];
    }
  }

  async findOne(id: number): Promise<Users> {
    if (!id) {
      throw new NotFoundException('User ID is required');
    }

    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {

    try {
      const user = await this.findOne(id);
      Object.assign(user, updateUserDto);

      const updatedUser = await this.userRepository.save(user);

      return {
        message: "Usuário atualizado com sucesso!",
        user: updatedUser
      }

    } catch (error) {
      console.error('Error updating user:', error);
    }


  }

  async remove(id: number) {

    try {
      const user = await this.findOne(id);
      await this.userRepository.remove(user);

      return {
        message: "Usuário removido com sucesso!",
        user
      }
    } catch (error) {
      console.error('Error removing user:', error);
    }
  }
}
