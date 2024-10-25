import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Task } from './entities/task.entity';
import { Attribute } from './entities/attribute.entity';
import { UserLevel } from './entities/userLevel.entity';
import { Badge } from './entities/badge.entity';
import { AttributeLevel } from './entities/attributeLevel.entity';
import { UserModule } from './user/user.module';
import { BadgeModule } from './badge/badge.module';
import { UserLevelModule } from './user-level/user-level.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [User, Task, Attribute, UserLevel, Badge, AttributeLevel],
      synchronize: true,
    }),
    UserModule,
    BadgeModule,
    UserLevelModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
