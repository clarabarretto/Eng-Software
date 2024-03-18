import BaseRoute from './baseRoute.js';
import MemberController from '../controllers/MemberController.js';
import MemberSchema from '../schemas/MemberSchema.js';

class MemberRoutes extends BaseRoute {
    setup() {
        this.routes.post('/', this.schemaValidator.validate(MemberSchema.create), MemberController.create);
        this.routes.get('/index/:group_id', this.schemaValidator.validate(MemberSchema.list), MemberController.list);
        this.routes.get('/:id', this.schemaValidator.validate(MemberSchema.find), MemberController.find);
        this.routes.delete('/:id', this.schemaValidator.validate(MemberSchema.delete), MemberController.delete);

        return this.routes
    }
}

export default new MemberRoutes()
