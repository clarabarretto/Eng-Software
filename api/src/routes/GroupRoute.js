import BaseRoute from './baseRoute';
import GroupController from '../controllers/GroupController';
import GroupSchema from '../schemas/GroupSchema';

class GroupRoutes extends BaseRoute {
    setup(){
        this.routes.post('/', this.schemaValidator.validate(GroupSchema.create), GroupController.create);
        this.routes.get('/', this.schemaValidator.validate(GroupSchema.list), GroupController.list);
        this.routes.get('/:id', this.schemaValidator.validate(GroupSchema.find), GroupController.find);
        this.routes.put('/:id', this.schemaValidator.validate(GroupSchema.update), GroupController.update);
        this.routes.delete('/:id', this.schemaValidator.validate(GroupSchema.find), GroupController.delete);

        return this.routes
    }
}

export default new GroupRoutes()
