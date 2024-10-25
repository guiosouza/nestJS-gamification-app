// user.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Badge } from 'src/entities/badge.entity';
import { UserLevel } from 'src/entities/userLevel.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Badge, UserLevel]), 
  ],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
