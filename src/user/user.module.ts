import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserLevel } from 'src/entities/userLevel.entity';
import { Badge } from 'src/entities/badge.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([User, UserLevel, Badge]),
    ],
    providers: [UserService],
    controllers: [UserController],
})
export class UserModule { }
