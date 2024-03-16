const Sequelize = require('sequelize');

import User from '../models/User';
import Group from '../models/Group';
import Feedback from '../models/Feedback';
import Member from '../models/Member';
import Skill from '../models/Skill';

const databaseConfig = require('../config/database');

const models = [User, Group, Feedback, Skill, Member];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));
models.forEach((model) => model.associate && model.associate(connection.models));
