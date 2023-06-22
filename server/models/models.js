const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    login: {type: DataTypes.STRING},
    phone: {type: DataTypes.STRING},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"}
})


const Application = sequelize.define('application', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    phone: {type: DataTypes.STRING, allowNull: false},
    name: {type: DataTypes.STRING, allowNull: false},
    address: {type: DataTypes.STRING, allowNull: false},
    time: {type: DataTypes.STRING, allowNull: false},
})

const Uploaded = sequelize.define('uploaded', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    author: {type: DataTypes.STRING, allowNull: false},
    role: {type: DataTypes.STRING, allowNull: false},
    uploadedFile: {type: DataTypes.STRING, allowNull: false},
})

const UserUploaded = sequelize.define('user_uploaded', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Review = sequelize.define('review', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.TEXT, allowNull: false},
})

User.hasMany(UserUploaded)
UserUploaded.belongsTo(User)

Uploaded.hasMany(UserUploaded)
UserUploaded.belongsTo(Uploaded)

module.exports = {
    Uploaded, User, UserUploaded, Review, Application
}





