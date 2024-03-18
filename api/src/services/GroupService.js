import Group from '../models/Group.js';
import Member from '../models/Member.js';
import User from '../models/User.js';
import Feedback from '../models/Feedback.js';

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
                admin_id: filter.user_id,
                is_deleted: false
            },
            attributes: ['id', 'name']
        };

        return Group.findAll(queryOptions);
    }

    async update({ filter, changes }) {
        const group = await this.find({ id: filter.id, is_deleted: false });

        if (!group) {
            throw new Error('NOT_FOUND');
        }

        const transaction = await Group.sequelize.transaction();

        try {
            const promises = [
                Group.update(changes, {
                    where: {
                        id: filter.id,
                        is_deleted: false
                    },
                    transaction
                }),
                Member.update(changes, {
                    where: {
                        group_id: filter.id,
                        is_deleted: false
                    },
                    transaction
                }),
                Feedback.update(changes, {
                    where:{
                        group_id: filter.id,
                        is_deleted: false
                    },
                    transaction
                })
            ];

            await Promise.all(promises);

            await transaction.commit();
        } catch (error) {
            await transaction.rollback();
            throw error;
        }

        return changes.is_deleted ? true : this.find(filter);
    }
}

export default new GroupService()