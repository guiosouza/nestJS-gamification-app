import { DataSource } from 'typeorm';
import { User } from './src/entities/user.entity';
import { Task } from './src/entities/task.entity';
import { Attribute } from './src/entities/attribute.entity';
import { UserLevel } from './src/entities/userLevel.entity';
import { Badge } from './src/entities/badge.entity';
import { AttributeLevel } from './src/entities/attributeLevel.entity';

const AppDataSource = new DataSource({
    type: 'sqlite',
    database: 'database.sqlite',
    entities: [User, Task, Attribute, UserLevel, Badge, AttributeLevel],
    migrations: [__dirname + '/migrations/*{.ts,.js}'],
    synchronize: false,
    logging: true,
    migrationsRun: true,
    migrationsTableName: 'migrations',
});


export default AppDataSource;