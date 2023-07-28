import { AppDataSource } from './data-source';

AppDataSource.initialize().then(() => {
  console.log('db connection established');
}).catch((err) => {
  console.log(err);
})