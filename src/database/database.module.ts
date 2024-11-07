import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../entities/user-entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',  
      port: 7777,        
      username: 'nest',
      password: 'nest',
      database: 'my_database',
      entities: [Users],
      synchronize: false,
      migrations: ['dist/migrations/*.js'],
    }),
  ],
})
export class DatabaseModule {}
