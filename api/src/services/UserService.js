import { literal } from 'sequelize';
import User from '../models/User.js';
import Member from '../models/Member.js';

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
                is_deleted: filter.is_deleted
            },
            attributes: ['id', 'name'],
            replacements: filter.search_text ? { search_text: this.getLikeValue(filter.search_text) } : {}
        };

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

    async login({ email, password }) {
        const user = await User.findOne({
            where: {
                email: email,
                is_deleted: false
            },
            attributes: ['id', 'password_hash', 'is_admin']
        });

        if (user && !(await user.passwordIsValid(password)) || !user) {
            throw new Error('INVALID_PASSWORD');
        }

        if (!user.is_admin) {
            const member = await Member.findOne({
                where: {
                    user_id: user.id,
                    is_deleted: false
                },
                attributes: ['group_id']
            });

            const parsedUser = await this.find({ id: user.id });

            return {
                ...parsedUser.toJSON(),
                group_id: member.group_id
            }
        }

        return this.find({ id: user.id });
    }
}

export default new UserService()