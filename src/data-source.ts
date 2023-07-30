import { DataSource } from 'typeorm';
import { Clients } from './entities/Clients';
import { Roles } from './entities/Roles';
import { Users } from './entities/Users';
import { Orders } from './entities/Orders';
import { Products } from './entities/Products';
import { Categories } from './entities/Categories';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.LYAH_DB_HOST,
  port: 3306,
  username: process.env.LYAH_DB_USERNAME,
  password: process.env.LYAH_DB_PASSWORD,
  database: process.env.LYAH_DB_DATABASE,
  synchronize: true,
  logging: ['error'],
  entities: [
    Clients,
    Roles,
    Users,
    Orders,
    Products,
    Categories,
  ],
  subscribers: [],
  migrations: [],
});
