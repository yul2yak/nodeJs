const environments = {
    development: {
        mysql: {
            username: 'root',
            password: 'root',
            database: 'node_api_codelab_dev'
        }
    },

    test: {
        mysql: {
            username: 'root',
            password: 'root',
            database: 'node_api_codelab_test'
        }
    },

    production: {
        mysql: {
            username: 'root',
            password: 'root',
            database: 'node_api_codelab_prd'
        }
    }
}

const nodeEnv = process.env.NODE_ENV || 'development';

module.exports = environments[nodeEnv];