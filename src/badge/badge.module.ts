import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BadgeService } from './badge.service';
import { BadgeController } from './badge.controller';
import { Badge } from '../entities/badge.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Badge])],
  controllers: [BadgeController],
  providers: [BadgeService],
  exports: [BadgeService],
})
export class BadgeModule {}
