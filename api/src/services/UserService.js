import { literal } from 'sequelize';
import User from '../models/User';

class UserService {
    getQueryOptions(filter) {
        return {
            where: {
               ...filter
            },
            attributes: ['id', 'name', 'email', 'is_admin']
        };
    }

    async find(filter) {
        const queryOptions = this.getQueryOptions(filter);

        return User.findOne(queryOptions);
    }

    getLikeValue(value) {
        return `%${(value || '').replace(/'/g, `${''}''`)}%`;
    };

    async list(filter) {
        const queryOptions = {
            where: {
                is_deleted: filter?.is_deleted || false
            },
            attributes: ['id', 'name'],
            replacements: filter?.search_text ? { search_text: this.getLikeValue(filter.search_text) } : {}
        };

        if (!filter) {
            return User.findAll(queryOptions);
        }


        if (filter.id.length) {
            queryOptions.where.id = filter.id;
        }

        if (filter.search_text) {
            queryOptions.where.name = literal('"User"."name" ILIKE :search_text');
        }

        if (filter.email) {
            queryOptions.where.email = filter.email;
        }

        return User.findAll(queryOptions);
    }

    async create(data) {
        await User.create(data);

        return true;
    }

    async update({ filter, changes }) {
        const queryOptions = this.getQueryOptions(filter);

        const user = await this.find(filter);

        if (!user) {
            throw new Error('NOT_FOUND');
        }

        await User.update(changes, queryOptions);

        return changes.is_deleted ? true : this.find(filter);
    }
}

export default new UserService()