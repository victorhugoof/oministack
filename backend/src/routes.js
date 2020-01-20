const { Router } = require('express');
const DevController = require('./controller/DevController');
const SearchController = require('./controller/SearchController');
const routes = Router();

/**
 * GET -> consultas
 * POST -> cadastros, inserção
 * PUT -> alterações
 */
routes.get('/', (request, response) => response.json({ message: 'OK' }));

/**
 * Devs
 */
routes.get('/devs/:github_username/github', DevController.viewGithub);

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);
routes.put('/devs', DevController.update);
routes.delete('/devs/:github_username', DevController.destroy);

routes.get('/search', SearchController.index);

module.exports = routes;
