import bodyParser from 'body-parser';
const { sequelize } = require('./models');

import morgan from 'morgan';
import express from 'express';
import cors from 'cors';
import config from './config';
// import redis from 'redis';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

const app = express();
const port = config.port;

// middleware
dotenv.config();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());
app.use(async (req, res, next) => {
  const token = req.headers['x-token'];
  if (token) {
    try {
      const me = await jwt.verify(token, process.env.JWT_SECRET);
      req.me = { ...me };
    } catch (e) {
      res.status(401).send('Session failed');
    }
  }
  next();
});

require('./routes')(app);

app.get('/', (req, res) => res.send('HELLO WORLD'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
