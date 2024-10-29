import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateAttributeDto } from './dto/create-attribute.dto';
import { Attribute } from 'src/entities/attribute.entity';
import { Task } from 'src/entities/task.entity';
import { User } from 'src/entities/user.entity';


@Injectable()
export class AttributeService {
  constructor(
    @InjectRepository(Attribute)
    private readonly attributeRepository: Repository<Attribute>,
    
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async create(createAttributeDto: CreateAttributeDto): Promise<Attribute> {
    const { title, exp, level, tasks, users } = createAttributeDto;

    const attribute = new Attribute();
    attribute.title = title;
    attribute.exp = exp;
    attribute.level = level;

    // Relacionamento com tarefas
    if (tasks && tasks.length > 0) {
      const taskEntities = await this.taskRepository.findByIds(tasks);
      attribute.tasks = taskEntities;
    }

    // Relacionamento com usuários
    if (users && users.length > 0) {
      const userEntities = await this.userRepository.findByIds(users);
      attribute.users = userEntities;
    }

    return this.attributeRepository.save(attribute);
  }
}
