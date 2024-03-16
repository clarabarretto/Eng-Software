import Sequelize, { Model } from 'sequelize';

export default class Skill extends Model {
    static init(sequelize) {
        super.init({
            type: {
                type: Sequelize.STRING,
                allowNull: false
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false
            },
            score: {
                type: Sequelize.INTEGER,
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
        this.belongsTo(models.Feedback, { foreignKey: 'feedback_id' });
    }
}
