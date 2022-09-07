const { Sequelize, DataTypes } = require('sequelize');

const { sequelize ,Sync} = require('./sequalize')
Sync(); 
let Users = require('./user.js')(sequelize, DataTypes);
let Hobby=require('./hobby.js')(sequelize, DataTypes)
let UserHobbies=require('./user_hobby.js')(sequelize, DataTypes)


Users.belongsToMany(Hobby, { through: UserHobbies });
Hobby.belongsToMany(Users, { through: UserHobbies });
console.log('Imported sequalize');

module.exports = { sequelize, Users, Hobby,UserHobbies };