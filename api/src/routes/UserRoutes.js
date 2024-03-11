import BaseRoute from './baseRoute';
import UserController from '../controllers/UserController';
import UserSchema from '../schemas/UserSchema';

class UserRoutes extends BaseRoute {
    setup(){
        this.routes.post('/', this.schemaValidator.validate(UserSchema.create), UserController.create);
        this.routes.get('/:id', this.schemaValidator.validate(UserSchema.find), UserController.find);
        this.routes.put('/:id', this.schemaValidator.validate(UserSchema.update), UserController.update);
        this.routes.delete('/:id', this.schemaValidator.validate(UserSchema.find), UserController.delete);

        // this.routes.use(this.LoginRequired)

        return this.routes
    }
}

export default new UserRoutes()
