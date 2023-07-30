import { AppDataSource } from './data-source';
import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser'
import authRouter from './routers/auth';
import passport from 'passport';
import session, { MemoryStore } from 'express-session';

AppDataSource.initialize().then(() => {
  console.log('db connection established');
}).catch((err) => {
  console.log(err);
});

const app: Express = express();

app.use(bodyParser.json());
app.use(passport.initialize());
app.use(session({
  secret: process.env.SESSION_SECRET!,
  resave: false,
  saveUninitialized: false
  /**
   * TODO: 
   * The default store is MemoryStore that only designed for devlopment purpose. 
   * Modify it before deploy on Production Environment!!!
   */
}));

app.use('/', authRouter);

app.get('/', (req, res) => {
  res.send('HOME PAGE');
})

app.listen(3000, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:3000`)
});

function authenticateToken(req: Request, res: Response, next: CallableFunction) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader?.split(' ')[1];
  if (!token) {
    return res.sendStatus(401);
  }
  
}