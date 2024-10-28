// app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { BadgeModule } from './badge/badge.module';
import { UserLevelModule } from './user-level/user-level.module';
import { TaskModule } from './task/task.module';
import AppDataSource from 'data-source-cli';

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSource.options),
    UserModule,
    BadgeModule,
    UserLevelModule,
    TaskModule,
  ],
})
export class AppModule {}
