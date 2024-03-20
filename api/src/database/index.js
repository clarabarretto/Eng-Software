import Sequelize from 'sequelize';

import { createRequire } from "module";
const require = createRequire(import.meta.url);
// const yourData = require("./config.js");

import User from '../models/User.js';
import Group from '../models/Group.js';
import Feedback from '../models/Feedback.js';
import Member from '../models/Member.js';
import Skill from '../models/Skill.js';

const databaseConfig = require('../config/database');

const models = [User, Group, Feedback, Skill, Member];

const connection = new Sequelize(databaseConfig.url, databaseConfig);

models.forEach((model) => model.init(connection));
models.forEach((model) => model.associate && model.associate(connection.models));
