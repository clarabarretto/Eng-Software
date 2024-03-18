import Sequelize, { Model } from "sequelize";

export default class Group extends Model {
    static init(sequelize) {
        super.init({
            name: {
                type: Sequelize.STRING,
                defaultValue: "",
            },
            is_deleted: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
                allowNull: false
            }
        }, {
            sequelize
        });
    }

    static associate(models) {
        this.hasMany(models.Feedback, { 
            foreignKey: 'group_id',
            as: 'feedbacks'
        });
        this.hasMany(models.Member, { 
            foreignKey: 'group_id',
            as: 'members'
        });
        this.belongsTo(models.User, { 
            foreignKey: 'admin_id',
            as: 'admin'
        });
    }
}
