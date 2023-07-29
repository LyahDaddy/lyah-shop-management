import { AppDataSource } from './data-source';
import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser'
import { Users } from './entity/Users';
import bcrypt from 'bcrypt';

AppDataSource.initialize().then(() => {
  console.log('db connection established');
}).catch((err) => {
  console.log(err);
});

const app: Express = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('hello');
});

app.post("/register", async (req: Request, res: Response) => {
  const saltRound = 10;
  const username: string = req.body.username as string;
  const password: string = req.body.password as string;
  
  if (!username || !password || String(password).length < 6) {
    return res.sendStatus(400);
  }
  
  // save username & password
  try {
    await bcrypt.hash(password, saltRound, async (err, hash) => {
      if (err) {
        return res.status(500).send(err);
      }
      await AppDataSource.createQueryBuilder()
        .insert()
        .into(Users)
        .values([{
          username: username,
          password: hash,
        }])
        .execute()
        .then((result) => {
          return res.sendStatus(200);
        })
        .catch((err) => {
          return res.sendStatus(400);
        });
    });
  } catch (err) {
    res.status(500).send(err)
  }
});

app.get('/login', async (req, res) => {
  const username: string = req.body.username as string;
  const password: string = req.body.password as string;
  if (username) {
    const user = await AppDataSource
      .getRepository(Users)
      .createQueryBuilder('users')
      .where('users.username = :username', {username: username})
      .getOne();
    if (user) {
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid) {
        return res.status(200).send('Login Successfully');
      }
      return res.status(401).send('Incorrect Password');
    }
    return res.status(400).send('User Is Not Found');
  }
  return res.status(400).send('Invalid Username');
})

app.listen(3000, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:3000`)
});