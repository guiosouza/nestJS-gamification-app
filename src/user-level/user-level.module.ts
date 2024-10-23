import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserLevelService } from './user-level.service';
import { UserLevelController } from './user-level.controller';
import { UserLevel } from 'src/entities/userLevel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserLevel])],
  controllers: [UserLevelController],
  providers: [UserLevelService],
})
export class UserLevelModule {}
