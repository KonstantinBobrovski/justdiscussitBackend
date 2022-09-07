module.exports = function(sequelize, DataTypes) {
    let UserHobby = sequelize.define('userhobby', {
        userId: {
            field: 'userId',
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        hoobbyId: {
            field: 'hoobbyId',
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        }
    });

    return UserHobby;
}