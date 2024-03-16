import BaseController from './BaseController';

import MemberService from '../services/MemberService';

class MemberController extends BaseController {
    constructor() {
        super()

        this.create = this.create.bind(this)
        this.find = this.find.bind(this)
        this.delete = this.delete.bind(this)
    }

    async create(req, res) {
        try {
            const filter = req.data;

            const response = await MemberService.create(filter);

            return this.handleResponse(res, response);
        } catch (error) {
            return this.handleError(res, error)
        }
    }

    async find(req, res) {
        try {
            const response = await MemberService.find(req.filter);

            return this.handleResponse(res, response);
        } catch (error) {
            return this.handleError(res, error)
        }
    }

    async list(req, res) {
        try {
            const response = await MemberService.list(req.filter);

            return this.handleResponse(res, response);
        } catch (error) {
            return this.handleError(res, error)
        }
    }

    async delete(req, res) {
        try {
            const options = {
                filter: {
                    id: req.filter.id
                },
                changes: {
                    is_deleted: true
                }
            };

            const response = await MemberService.delete(options);

            return this.handleResponse(res, response);
        } catch (error) {
            return this.handleError(res, error)
        }
    }
}

export default new MemberController();
