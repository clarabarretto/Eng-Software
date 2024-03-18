import env from 'dotenv';
// import { resolve } from 'path';

import express from 'express';
import cors from 'cors';

import UserRoutes from './src/routes/UserRoutes.js';
import GroupRoutes from './src/routes/GroupRoute.js';
import MemberRoutes from './src/routes/MemberRoute.js';
import FeedbackRoutes from './src/routes/FeedbackRoute.js';

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
        this.app.use('/feedbacks', FeedbackRoutes.setup());
    }

    setup() {
        this.middlewares();
        this.routes();
    };
}

export default new App().app;
