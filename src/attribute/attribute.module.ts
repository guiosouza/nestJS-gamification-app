import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttributeService } from './attribute.service';
import { AttributeController } from './attribute.controller';
import { Attribute } from 'src/entities/attribute.entity';
import { Task } from 'src/entities/task.entity';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Attribute, Task, User])],
  providers: [AttributeService],
  controllers: [AttributeController],
})
export class AttributeModule {}
