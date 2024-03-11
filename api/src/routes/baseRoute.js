import { Router } from 'express';
import SchemaValidator from '../schemas/validate';
import loginRequired from '../middlewares/loginRequired';

class BaseRoute{
    constructor(){
        this.routes = Router()
        this.schemaValidator = new SchemaValidator();
        this.LoginRequired = loginRequired.validToken;
        this.isAdmin = loginRequired.isAdmin;
    }
}

export default BaseRoute
