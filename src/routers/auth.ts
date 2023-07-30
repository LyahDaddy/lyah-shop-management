import express from 'express';
import bcrypt from 'bcrypt';
import { AppDataSource } from '../data-source';
import { Users } from '../entities/Users';
import LocalStrategy from 'passport-local'
import passport from 'passport';

declare global {
  namespace Express {
    interface User {
      username: string;
      id?: number | undefined;
    }
  }
}

passport.use(new LocalStrategy.Strategy((username, password, cb) => {
  AppDataSource.getRepository(Users)
    .createQueryBuilder('users')
    .where('users.username = :username', {username: username})
    .getOne().then((user) => {
      if (!user) {
        return cb(null, false, { message: 'Incorrect username or password.' });
      }
      bcrypt.compare(password, user.password, (err, same) => {
        if (err) {
          return cb(err);
        }
        if (!same) {
          return cb(null, false, { message: 'Incorrect username or password.' });
        }
        return cb(null, user);
      });
    }).catch((err) => {
      return cb(err);
    });
}));

passport.serializeUser((user, cb) => {
  process.nextTick(function() {
    cb(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser<Users>(function(user, cb) {
  process.nextTick(() => {
    return cb(null, user);
  });
});

const router = express.Router();

router.post('/signup', async (req, res, next) => {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  await AppDataSource.createQueryBuilder()
    .insert()
    .into(Users)
    .values([{
      username: req.body.username,
      salt: salt,
      password: hashedPassword,
    }])
    .execute()
    .then((result) => {
      const user = {
        id: result.raw.insertId,
        username: req.body.username,
      }
      req.login(user, (err) => {
        if (err) {
          return next(err);
        }
        res.sendStatus(200);
      });
    })
    .catch((err) => { return next(err); });
});

router.post('/login/password', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureMessage: 'Login Failed',
}));

router.post('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/login')
  });
})

export default router
