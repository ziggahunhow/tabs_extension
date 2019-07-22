const { User } = require('../models');
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { checkUserLogin } from '../helpers';

const createToken = ({ id, email }) =>
  jwt.sign({ id, email }, process.env.JWT_SECRET, {
    expiresIn: '15d'
  });

module.exports = {
  async register(req, res) {
    try {
      const { name, userName, email, password } = req.body;
      const saltRounds = process.env.NODE_ENV === 'development' ? 10 : 15;
      const hash = await bcrypt.hash(password, saltRounds);
      const user = await User.create({
        name,
        userName,
        email,
        password: hash
      });
      const userJson = user.toJSON();
      res.send({
        name: userJson.name
      });
    } catch (err) {
      res.status(400).send(err.message);
    }
  },
  async updateUser(req, res) {
    const { uid, name } = req.body;
    try {
      checkUserLogin(req);
      await User.update({ name }, { where: { id: uid } });
      res.send(`New Name: ${name} updated`);
    } catch (err) {
      res.status(400).send(err.message);
    }
  },
  async login(req, res) {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) throw new Error('Email Account Does Not Exist!');
      const validPw = await bcrypt.compare(password, user.password);
      if (!validPw) throw new Error('Password Invalid!');
      // temporary login fn
      res.send({
        token: await createToken({ id: user.id, email: user.email })
      });
    } catch (err) {
      res.status(400).send(err.message);
    }
  }
};
