import usersController from './controllers/users';
import bookmarksController from './controllers/bookmarks';

module.exports = app => {
  // app.get('/users', usersController.index);
  // app.delete('/users', usersController.delete);
  app.post('/users/register', usersController.register);
  app.post('/users/login', usersController.login);
  app.post('/users', usersController.updateUser);

  app.get('/bookmarks', bookmarksController.index);
  app.post('/bookmark', bookmarksController.updateBookmark);
  app.delete('/bookmark/delete', bookmarksController.deleteBookmark);
  app.post('/bookmark/create', bookmarksController.createBookmark);
};
