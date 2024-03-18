import { literal } from 'sequelize';

import Group from '../models/Group.js';
import Member from '../models/Member.js';
import User from '../models/User.js';

class GroupService {
    getQueryOptions(filter) {
        return {
            where: {
                ...filter
            },
            attributes: ['id', 'name'],
            include: [{
                model: Member,
                required: false,
                where: {
                    is_deleted: false
                },
                attributes: ['id'],
                as: 'members',
                include: [{
                    model: User,
                    where: {
                        is_deleted: false
                    },
                    required: false,
                    attributes: ['id', 'name', 'email']
                }]
            }, {
                model: User,
                where: {
                    is_deleted: false
                },
                attributes: ['id', 'name'],
                as: 'admin'
            }],
            logging: true
        };
    }

    async find(filter) {
        const queryOptions = this.getQueryOptions(filter);

        return Group.findOne(queryOptions);
    }

    async create(data) {
        await Group.create(data);

        return true;
    }

    getLikeValue(value) {
        return `%${(value || '').replace(/'/g, `${''}''`)}%`;
    };

    async list(filter) {
        const queryOptions = {
            where: {
                is_deleted: false
            },
            attributes: ['id', 'name'],
            replacements: filter.search_text ? { search_text: this.getLikeValue(filter.search_text) } : {}
        };

        if (filter.id.length) {
            queryOptions.where.id = filter.id;
        }

        if (filter.search_text) {
            queryOptions.where.name = literal('"Group"."name"ILIKE :search_text');
        }

        return Group.findAll(queryOptions);
    }

    async update({ filter, changes }) {
        const queryOptions = this.getQueryOptions(filter);

        const group = await this.find(filter);

        if (!group) {
            throw new Error('NOT_FOUND');
        }

        await Group.update(changes, queryOptions);

        return changes.is_deleted ? true : this.find(filter);
    }
}

export default new GroupService()