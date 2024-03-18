import BaseRoute from './baseRoute.js';
import GroupController from '../controllers/GroupController.js';
import GroupSchema from '../schemas/GroupSchema.js';

class GroupRoutes extends BaseRoute {
    setup() {
        this.routes.post('/', this.schemaValidator.validate(GroupSchema.create), GroupController.create);
        this.routes.get('/:user_id', this.schemaValidator.validate(GroupSchema.list), GroupController.list);
        this.routes.get('/find/:id', this.schemaValidator.validate(GroupSchema.find), GroupController.find);
        this.routes.put('/:id', this.schemaValidator.validate(GroupSchema.update), GroupController.update);
        this.routes.delete('/:id', this.schemaValidator.validate(GroupSchema.find), GroupController.delete);

        return this.routes
    }
}

export default new GroupRoutes()
