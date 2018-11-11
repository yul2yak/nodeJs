const express = require('express');
const app = express();
const models = require('../../db/models');

let users = [
    {
        id: 1,
        name: 'alice'
    },
    {
        id: 2,
        name: 'bek'
    },
    {
        id: 3,
        name: 'chris'
    }
];

exports.index = (req, res) => {
    models.User.findAll()
        .then(users => res.json(users));
    //res.json(users);
};

exports.show = (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (!id) {
        return res.status(404).json({error: 'Incorrect id'});
    }

    models.User.findOne({
        where: {
            id: id
        }
    }).then(user => {
        if (!user) {
            return res.status(404).json({error: 'No user'});
        }
        return res.json(user);
    });
    /*let user = users.filter(user => user.id === id)[0];
    if (!user) {
        return res.status(404).json({error: 'Unknown user'});
    }
    return res.json(user);*/
};

exports.destory = (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (!id) {
        return res.status(404).json({error: 'Incorrect id'});
    }

    models.User.destroy({
        where: {
            id: id
        }
    }).then(() => res.status(204).send());
    /*const userIdx = users.findIndex(user => user.id === id);
    if (userIdx === -1) {
        return res.status(404).json({error: 'Unknown user'});
    }
    users.splice(userIdx, 1);
    return res.status(204).send();*/
};

exports.create = (req, res) => {
    const name = req.body.name || '';
    if (!name.length) {
        return res.status(400).json({error: 'Incorrect name'});
    }

    models.User.create({
        name: name
    }).then((user) => res.status(201).json(user))

    /*const id = users.reduce((maxId, user) => {
        return user.id > maxId ? user.id : maxId
    }, 0) + 1;
    const newUser = {
        id: id,
        name: name
    };
    users.push(newUser);
    return res.status(201).json(newUser);*/
};

exports.update = (req, res) => {
    res.send();
};