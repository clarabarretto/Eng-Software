import BaseController from './BaseController.js';

import GroupService from '../services/GroupService.js';

class GroupController extends BaseController {
    constructor() {
        super()

        this.create = this.create.bind(this)
        this.find = this.find.bind(this)
        this.update = this.update.bind(this)
        this.delete = this.delete.bind(this)
        this.list = this.list.bind(this)
    }

    async create(req, res) {
        try {
            const response = await GroupService.create(req.data);

            return this.handleResponse(res, response);
        } catch (error) {
            return this.handleError(res, error)
        }
    }

    async find(req, res) {
        try {
            const response = await GroupService.find(req.filter);

            return this.handleResponse(res, response);
        } catch (error) {
            return this.handleError(res, error)
        }
    }

    async list(req, res) {
        try {
            const response = await GroupService.list(req.filter);

            return this.handleResponse(res, response);
        } catch (error) {
            return this.handleError(res, error)
        }
    }

    async update(req, res) {
        try {
            const options = {
                filter: {
                    ...req.filter
                },
                changes: {
                    ...req.data
                }
            };

            const response = await GroupService.update(options);

            return this.handleResponse(res, response);
        } catch (error) {
            return this.handleError(res, error)
        }
    }

    async delete(req, res) {
        try {
            const options = {
                filter: {
                    ...req.filter,
                    is_deleted: false
                },
                changes: {
                    is_deleted: true
                }
            };

            const response = await GroupService.update(options);

            return this.handleResponse(res, response);
        } catch (error) {
            return this.handleError(res, error)
        }
    }
}

export default new GroupController();
