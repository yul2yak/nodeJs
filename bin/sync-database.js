const models = require('../models/models');

module.exports = () => {
    return models.sequelize.sync({force: false});
};