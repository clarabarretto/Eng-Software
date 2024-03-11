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
}
