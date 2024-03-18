import Feedback from '../models/Feedback';
import Skill from '../models/Skill';
import Group from '../models/Group';
import User from '../models/User';

class FeedbackService {
    getAverageScore(skills) {
        let totalScore = 0

        skills.forEach(skill => totalScore += skill.score);

        return totalScore / 6;
    }

    async create(data) {
        const filter = {
            user_id: data.user_id,
            group_id: data.group_id,
            is_active: true
        };

        const activeFeedBack = await this.find(filter, false);

        const transaction = await Feedback.sequelize.transaction()

        try {
            const promises = [
                Feedback.create({
                    ...filter,
                    average_score: this.getAverageScore(data.skills)
                },{ transaction })
            ];
    
            if (activeFeedBack) {
                promises.push(
                    Feedback.update({
                        is_active: false
                    }, {
                        where: {
                            id: activeFeedBack.id
                        },
                        transaction
                    })
                );
            }
    
            const [feedback, oldFeedBack] = await Promise.all(promises);
            
            const skills = data.skills.map(skill => {
                return {
                    ...skill,
                    feedback_id: feedback.id
                };
            });
    
            await Skill.bulkCreate(skills, { transaction });

            await transaction.commit();
            
        } catch (error) {
            await transaction.rollback();
            throw error
        }

        return this.find(filter);
    }

    async find(filter, withSkills = true) {
        const queryOptions = {
            where: {
                user_id: filter.user_id,
                group_id: filter.group_id,
                is_deleted: false
            },
            attributes: ['id', 'average_score', 'group_id', 'user_id', 'is_active']
        };

        if (filter.is_active === false || filter.is_active) {
            queryOptions.where.is_active = filter.is_active
        }

        if (withSkills) {
            queryOptions.include = [
                {
                    model: Skill,
                    attributes: ['id', 'type', 'title', 'score'],
                    as: 'skills'
                }
            ]
        }

        return Feedback.findOne(queryOptions);
    }

    async list(filter) {
        return Feedback.findAll({
            where: {
                user_id: filter.user_id,
                is_deleted: false
            },
            attributes: ['id', 'average_score', 'user_id', 'group_id', 'is_active', 'created_at'],
            include: [
                {
                    model: Skill,
                    attributes: ['id', 'type', 'score'],
                    as: 'skills'
                }, {
                    model: Group,
                    attributes: ['id', 'name'],
                    as: 'group',
                    include: [
                        {
                            model: User,
                            attributes: ['id', 'name'],
                            as: 'admin'
                        }
                    ]
                }
            ]
        });
    }

    async delete(filter) {
        const feedback = await this.find(filter, false);

        if (!feedback) {
            throw new Error('NOT_FOUND');
        }
        const transaction = await Feedback.sequelize.transaction();

        try {
            const promises = [
                Feedback.update({
                    is_deleted: true,
                    is_active: false
                }, {
                    where: {
                       id: feedback.id
                    },
                    transaction
                }),
                Skill.update({
                    is_deleted: true
                }, {
                    where: {
                        feedback_id: feedback.id
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

        return true;
    }
}

export default new FeedbackService()