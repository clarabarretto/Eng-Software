import Group from '../models/Group';

class GroupService {
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

        return Group.findOne(queryOptions);
    }

    async create(data) {
        await Group.create(data);

        return true;
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