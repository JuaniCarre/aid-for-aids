const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey: true
        },
        name:{
            type: DataTypes.STRING,
            allowNull:false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique:true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        picture: {
            type: DataTypes.STRING,
        },
        address: {
            type: DataTypes.STRING
        },
        cart:{
            type: DataTypes.ARRAY(DataTypes.JSON),
            defaultValue: []
        },
        orders:{
            type: DataTypes.ARRAY(DataTypes.JSON),
            defaultValue: []
        }
    })
}