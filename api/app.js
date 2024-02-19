import './src/database';

import env from 'dotenv';
// import { resolve } from 'path';

import express from 'express';
// import cors from 'cors';

env.config();

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }
  middlewares() {
    // this.app.use(express.static(resolve(__dirname, 'uploads')));
    // this.app.use(cors());
    this.app.use(express.json({ limit: "100mb" }));
    this.app.use(express.text({ limit: "100mb" }));
    this.app.use(express.urlencoded({ limit: "100mb", extended: true }));

  }
  routes() {
  }
  setup() {
    this.middlewares();
    this.routes();
};
}

export default new App().app;
