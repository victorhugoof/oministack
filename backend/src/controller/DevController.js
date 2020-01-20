const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/ParseStringAsArray');

module.exports = {
    async viewGithub(request, response) {
        const { github_username } = request.params;
        const axiosReponse = await axios.get(`https://api.github.com/users/${github_username}`);
        return response.json(axiosReponse);
    },
    async index(request, response) {
        return response.json(await Dev.find());
    },
    async store(request, response) {
        const { github_username, techs, latitude, longitude } = request.body;
        let dev = await Dev.findOne({ github_username });

        if (!dev) {
            const apiReponse = await axios.get(`https://api.github.com/users/${github_username}`);
            const { avatar_url, bio } = apiReponse.data;
            const name = apiReponse.data.name || apiReponse.data.login;
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }

            dev = await Dev.create({
                name,
                github_username,
                bio,
                avatar_url,
                techs: parseStringAsArray(techs),
                location
            });
        }

        return response.json(dev);
    },
    async update(request, response) {
        const { github_username, name, bio, avatar_url, techs, latitude, longitude } = request.body;
        const location = (latitude && longitude) ? {
            type: 'Point',
            coordinates: [longitude, latitude]
        } : null;

        let dev = await Dev.findOne({ github_username });
        if (!dev) {
            return response.json({ message: 'Dev não cadastrado!' });
        }

        return response.json(await Dev.update({ github_username }, {
            name,
            bio,
            avatar_url,
            techs: parseStringAsArray(techs),
            location
        }))
    },
    async destroy(request, response) {
        const { github_username } = request.params;
        response.json(await Dev.deleteMany({ github_username }));
    }
}
