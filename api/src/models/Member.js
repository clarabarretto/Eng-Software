import Sequelize, { Model } from 'sequelize';

export default class Member extends Model {
    static init(sequelize) {
        super.init({
            is_admin: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
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
        this.belongsTo(models.User, { foreignKey: 'user_id' });
        this.belongsTo(models.Group, { foreignKey: 'group_id' });
    }
}
