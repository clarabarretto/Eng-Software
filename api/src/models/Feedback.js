import Sequelize, { Model } from 'sequelize';

export default class Feedback extends Model {
    static init(sequelize) {
        super.init({
            average_score: {
                type: Sequelize.FLOAT,
                allowNull: false
            },
            is_deleted: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
                allowNull: false
            },
            is_active: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
                allowNull: false
            }
        }, {
            sequelize
        });

        return this;
    }

    static associate(models) {
        this.belongsTo(models.User, {
            foreignKey: 'user_id',
            as: 'user'
        });
        this.belongsTo(models.Group, {
            foreignKey: 'group_id',
            as: 'group'
        });
        this.hasMany(models.Skill, {
            foreignKey: 'feedback_id',
            as: 'skills'
        });
    }
}
