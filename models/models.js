const config = require('../config/environment');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    config.mysql.database,
    config.mysql.username,
    config.mysql.password,
    {
        host: 'localhost',
        dialect: 'mysql',
        // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
        operatorsAliases: false,
    },
);

const User = sequelize.define('user', {
    name: Sequelize.STRING,
    userId: Sequelize.STRING,
});

const Game = sequelize.define('game', {
    game: {
        type: Sequelize.JSON,
        set: function (value) {
            if (typeof value === 'string') {
                this.setDataValue('game', JSON.parse(value));
            } else {
                this.setDataValue('game', value);
            }
        }
    },
});

module.exports = {
    sequelize: sequelize,
    User: User,
    Game: Game
};