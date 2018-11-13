const express = require('express');
const app = express();
const models = require('../../models/models');

exports.index = (req, res) => {
    models.Game.findAll()
        .then(games => res.json(games));
};

exports.show = (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (!id) {
        return res.status(404).json({error: 'Incorrect id'});
    }

    models.Game.findOne({
        where: {
            id: id
        }
    }).then(game => {
        if (!game) {
            return res.status(404).json({error: 'No game'});
        }
        return res.json(game);
    });
};

exports.destory = (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (!id) {
        return res.status(404).json({error: 'Incorrect id'});
    }

    models.Game.destroy({
        where: {
            id: id
        }
    }).then(() => res.status(204).send());
};

exports.create = (req, res) => {
    const game = req.body.game || '';
    if (!game.length) {
        return res.status(400).json({error: 'Incorrect date'});
    }

    models.Game.create({
        game: game
    }).then((game) => res.status(201).json(game))
};

exports.update = (req, res) => {
    res.send();
};