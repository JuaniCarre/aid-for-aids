const { DataTypes, STRING } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('order', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey: true
        },
        items: {
            type: DataTypes.ARRAY(DataTypes.JSONB)
        },
        status: {
            type: DataTypes.ENUM('pendiente', 'pago', 'entregado', 'cancelado'),
            defaultValue: 'pendiente'
        },
        address: {
            type:STRING
        }
    })
}