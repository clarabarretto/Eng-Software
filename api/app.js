import './src/database';

import env from 'dotenv';
// import { resolve } from 'path';

import express from 'express';
import cors from 'cors';

import UserRoutes from './src/routes/UserRoutes';
import GroupRoutes from './src/routes/GroupRoute';
import MemberRoutes from './src/routes/MemberRoute';

env.config();

class App {
    constructor() {
        this.app = express();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json({ limit: "100mb" }));
        this.app.use(express.text({ limit: "100mb" }));
        this.app.use(express.urlencoded({ limit: "100mb", extended: true }));

    }

    routes() {
        this.app.use('/users', UserRoutes.setup());
        this.app.use('/groups', GroupRoutes.setup());
        this.app.use('/members', MemberRoutes.setup());
    }
    
    setup() {
        this.middlewares();
        this.routes();
    };
}

export default new App().app;
