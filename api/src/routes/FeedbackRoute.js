import BaseRoute from './baseRoute';
import FeedbackController from '../controllers/FeedbackController';
import FeedbackSchema from '../schemas/FeedbackSchema';

class FeedbackRoutes extends BaseRoute {
    setup(){
        this.routes.post('/', this.schemaValidator.validate(FeedbackSchema.create), FeedbackController.create);
        this.routes.post('/find', this.schemaValidator.validate(FeedbackSchema.find), FeedbackController.find);
        this.routes.get('/:user_id', this.schemaValidator.validate(FeedbackSchema.list), FeedbackController.list);
        this.routes.delete('/delete/:id', this.schemaValidator.validate(FeedbackSchema.list), FeedbackController.list);

        return this.routes
    }
}

export default new FeedbackRoutes()
