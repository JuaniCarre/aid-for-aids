const { DataTypes, STRING } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('order', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        items: {
            type: DataTypes.ARRAY(DataTypes.JSONB)
        },
        status: {
            type: DataTypes.ENUM('pendiente', 'pago', 'entregado', 'cancelado'),
            defaltvalue: 'pendiente'
        },
        adress: {
            type:STRING
        }
    })
}