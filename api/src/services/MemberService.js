import Member from '../models/Member.js';
import User from '../models/User.js';
import Group from '../models/Group.js';

class MemberService {
    async create(filter) {
        const promises = [
            User.findOne({
                where: {
                    id: filter.user_id,
                    is_deleted: false
                },
                attributes: ['id']
            }),
            Group.findOne({
                where: {
                    id: filter.group_id,
                    is_deleted: false
                },
                attributes: ['id']
            })
        ];

        const [user, group] = await Promise.all(promises);

        if (!user || !group) {
            throw new Error('INVALID_REQUEST')
        }

        const member = await Member.create({
            user_id: user.id,
            group_id: group.id
        });

        return this.find({ id: member.id });
    }

    async find(filter) {
        return Member.findOne({
            where: {
                id: filter.id
            },
            include: [{
                model: User,
                where: {
                    is_deleted: false
                },
                required: false,
                attributes: ['id', 'name', 'email']
            }],
            attributes: ['id']
        });
    }

    async list(filter) {
        return Member.findAll({
            where: {
                group_id: filter.group_id,
                is_deleted: false
            },
            attributes: ['id'],
            include: [{
                model: User,
                where: {
                    is_deleted: false
                },
                required: false,
                attributes: ['id', 'name', 'email']
            }],
        })
    }

    async delete({ filter, changes }) {
        await Member.update(changes, {
            where: {
                id: filter.id
            }
        });

        return true;
    }
}

export default new MemberService()