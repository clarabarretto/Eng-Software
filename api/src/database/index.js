const Sequelize = require('sequelize');

import User from '../models/User';
import Group from '../models/Group';

const databaseConfig = require('../config/database');

const models = [User, Group];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));
models.forEach((model) => model.associate && model.associate(connection.models));
