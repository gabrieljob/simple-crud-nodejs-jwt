const express = require('express');
const User = require('./controllers/UserController');
const auth = require('./middlewares/auth');
const routes = express.Router();

routes.post('/store', User.store);
routes.post('/login', User.login);
routes.put('/update', auth, User.update);
routes.get('/delete/:id', User.delete);

routes.get('/auth/', auth, (req, res) => {
    res.json({ok: true, user: req.userId})
});

module.exports = routes;