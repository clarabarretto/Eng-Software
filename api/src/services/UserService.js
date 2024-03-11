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