module.exports = function(sequelize, DataTypes) {
    let User = sequelize.define('user', {
        id: {
            field: 'id',
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        username: {
            field: 'username',
            type: DataTypes.STRING(30),
            allowNull: false,
            unique: true
        },
        name:{
            field: 'name',
            type: DataTypes.STRING(30),
           
        },
        email: {
            field: 'email',
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            field: 'password',
            type: DataTypes.STRING,
            allowNull: false
        },
        country:{
            type: DataTypes.STRING,
            field: 'country',
        },
        language:{
            type: DataTypes.STRING,
            field: 'language',
        },
        description:{
            type: DataTypes.STRING,
            field: 'description',
        },
        age:{
            type: DataTypes.INTEGER,
            field: 'age',
        },
        time:{
            type: DataTypes.STRING,
            field: 'time',
        }
    });

    return User;
}