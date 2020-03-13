const { resolve } = require('path');

module.exports = {
    config: resolve(_dirname, 'src', 'config', 'database,js'),
    'models-path': resolve(_dirname, 'src', 'config', 'database,js'),
    'migrations-path': resolve(_dirname, 'src', 'config', 'database,js'),
    'seeders-path': resolve(_dirname, 'src', 'config', 'database,js'),
};