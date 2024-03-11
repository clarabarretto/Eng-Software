const Sequelize = require('sequelize');

import User from '../models/User';

const databaseConfig = require('../config/database');

const models = [User];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));
models.forEach((model) => model.associate && model.associate(connection.models));
