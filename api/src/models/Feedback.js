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
            }
        }, {
            sequelize
        });

        return this;
    }

    static associate(models) {
        this.hasOne(models.User, { foreignKey: 'user_id' });
        this.belongsTo(models.Group, { foreignKey: 'group_id' });
        this.hasMany(models.Skill, { 
            foreignKey: 'skill_id',
            as: 'skills'
        });
    }
}
