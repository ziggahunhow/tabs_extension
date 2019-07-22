const { Bookmark } = require('../models');
import { checkUserLogin } from '../helpers';
import decode from 'jwt-decode';

module.exports = {
  async createBookmark(req, res) {
    try {
      if (!req.body.uid) throw new Error('no user id');
      if (!req.body.url.startsWith('http'))
        req.body.url = 'http://' + req.body.url;
      const bookmark = await Bookmark.create({
        ...req.body,
        UserId: req.body.uid
      });
      res.send({
        name: bookmark.toJSON().title
      });
    } catch (err) {
      res.status(400).send(err.message);
    }
  },
  async updateBookmark(req, res) {
    try {
      // me and bookmark id
      checkUserLogin(req);
      const { title, url, bookmarkId } = req.body;
      let content = {};
      if (url) content = { ...content, url };
      if (title) content = { ...content, title };
      Bookmark.update({ title, url }, { where: { id: bookmarkId } });
      res.send(`${title || url} updated`);
    } catch (error) {
      res.status(400).send(error.message);
    }
  },
  async index(req, res) {
    try {
      // checkUserLogin(req);
      const uid = decode(req.headers['x-token']).id;
      let bookmarks = await Bookmark.findAll({
        where: { UserId: uid }
      });
      for (let i = 0; i < bookmarks.length; i++) {
        bookmarks[i] = bookmarks[i].dataValues;
      }
      res.send(bookmarks);
    } catch (error) {
      console.log('error', error);
      res.status(400).send(error.message);
    }
  },
  async deleteBookmark(req, res) {
    try {
      checkUserLogin(req);
      const url = req.body.url;
      await Bookmark.destroy({ where: { url } });
      // res.send(`${url} deleted`);
      res.json({ [url]: 'deleted' });
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
};
