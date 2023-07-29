import { DataSource } from 'typeorm';
import { Clients } from './entity/Clients';
import { Roles } from './entity/Roles';
import { Users } from './entity/Users';
import { Orders } from './entity/Orders';
import { Products } from './entity/Products';
import { Categories } from './entity/Categories';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.LYAH_DB_HOST,
  port: 3306,
  username: process.env.LYAH_DB_USERNAME,
  password: process.env.LYAH_DB_PASSWORD,
  database: 'lyah_shop_dev',
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
