module.exports = function (sequelize, DataTypes) {
    let Chat = sequelize.define('Chat', {
        id: {
            field: 'id',
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        userOneId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        userTwoId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }

    });

    return Chat;
}