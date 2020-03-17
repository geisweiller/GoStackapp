import Sequelize from 'sequelize'; //responsável pela conexão com  o bd

import User from '../app/models/User'; //importar models

import databaseConfig from '../config/database';

const models = [User]; //array com models

class Database {
    constructor() {
        this.init();

    }

    init() { //carrega os  models
        this.connection = new Sequelize(databaseConfig)

        models.map(model => model.init(this.connection)); //.map percorre o array models

    }
}

export default new Database();
