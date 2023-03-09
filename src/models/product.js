const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('product', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey: true
        },
        titulo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        codigo: {
            type: DataTypes.STRING,
            allowNull:false
        },
        editorial: {
            type: DataTypes.STRING,
        },
        autor: {
            type: DataTypes.STRING,
        },
        precio: {
            type: DataTypes.DECIMAL(7, 2),
            allowNull: false
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        distribuidor: {
            type: DataTypes.STRING,
            defaultValue:"desconocido"
        }
    })
}