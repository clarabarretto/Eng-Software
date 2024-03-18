import { Router } from 'express';
import SchemaValidator from '../schemas/validate.js';
import loginRequired from '../middlewares/loginRequired.js';

class BaseRoute {
    constructor() {
        this.routes = Router()
        this.schemaValidator = new SchemaValidator();
        this.LoginRequired = loginRequired.validToken;
        this.isAdmin = loginRequired.isAdmin;
    }
}

export default BaseRoute
