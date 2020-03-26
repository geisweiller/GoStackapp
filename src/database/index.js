/* eslint-disable prettier/prettier */
import Sequelize from 'sequelize'; // responsável pela conexão com  o bd
import mongoose from 'mongoose';

import User from '../app/models/User'; // importar models
import File from '../app/models/File';
import Appointment from '../app/models/Appointments';

import databaseConfig from '../config/database';

const models = [User, File, Appointment]; // array com models

class Database {
    constructor() {
        this.init();
        this.mongo();
    }

    init() {
        // carrega os  models
        this.connection = new Sequelize(databaseConfig);

        models
            .map(model => model.init(this.connection))
            .map(
                model =>
                // eslint-disable-next-line prettier/prettier
                model.associate && model.associate(this.connection.models)
            ); // .map percorre o array models
    }

    mongo() {
        this.mongoConnection = mongoose.connect('mongodb://localhost:27017/mongoapp', { useNewUrlParser: true, useFindAndModify: true });
    }
}


export default new Database();
