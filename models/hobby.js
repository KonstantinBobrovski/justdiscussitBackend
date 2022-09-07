module.exports = function(sequelize, DataTypes) {
    let Hobby = sequelize.define('hobby', {
        id: {
            field: 'id',
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            field: 'name',
            type: DataTypes.STRING(30),
            allowNull: false,
            unique: true
        }
      
    });

    return Hobby;
}