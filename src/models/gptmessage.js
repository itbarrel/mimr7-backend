const { Model } = require('sequelize')
const sequelizePaginate = require('sequelize-paginate')

module.exports = (sequelize, DataTypes) => {
    class GptMessage extends Model {
        static associate(models) {
            GptMessage.belongsTo(models.Account, {
                foreignKey: {
                    allowNull: false,
                },
            })
            GptMessage.belongsTo(models.Highlight, {
                foreignKey: {
                    allowNull: false,
                },
            })
        }
    }
    GptMessage.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        group: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        name: {
            type: DataTypes.TEXT,
        },
        solution: {
            type: DataTypes.TEXT,
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE,
        },
        updatedAt: {
            allowNull: true,
            type: DataTypes.DATE,
        },
        deletedAt: {
            allowNull: true,
            type: DataTypes.DATE,
        },
    }, {
        sequelize,
        modelName: 'GptMessage',
        tableName: 'gptMessages',
        paranoid: true,
    })
    sequelizePaginate.paginate(GptMessage)
    return GptMessage
}
