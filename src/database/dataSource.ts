import { DataSource } from 'typeorm';
import { Users } from '../entities/user-entity';

const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 7777,
  username: 'nest',
  password: 'nest',
  database: 'my_database',
  entities: [Users],
  migrations: ['src/migrations/*.ts'],
});

export default AppDataSource;
