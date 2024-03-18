import BaseController from './BaseController.js';

import FeedbackService from '../services/FeedbackService.js';

class FeedbackController extends BaseController {
    constructor() {
        super()

        this.create = this.create.bind(this)
        this.find = this.find.bind(this)
        this.delete = this.delete.bind(this)
        this.list = this.list.bind(this)
    }

    async create(req, res) {
        try {
            const response = await FeedbackService.create(req.data);

            return this.handleResponse(res, response);
        } catch (error) {
            return this.handleError(res, error)
        }
    }

    async find(req, res) {
        try {
            const response = await FeedbackService.find(req.data);

            return this.handleResponse(res, response);
        } catch (error) {
            return this.handleError(res, error)
        }
    }

    async list(req, res) {
        try {
            const response = await FeedbackService.list(req.filter);

            return this.handleResponse(res, response);
        } catch (error) {
            return this.handleError(res, error)
        }
    }

    async delete(req, res) {
        try {
            const response = await FeedbackService.delete(req.filter);

            return this.handleResponse(res, response);
        } catch (error) {
            return this.handleError(res, error)
        }
    }
}

export default new FeedbackController();
