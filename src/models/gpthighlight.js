const { Model } = require('sequelize')
const sequelizePaginate = require('sequelize-paginate')

module.exports = (sequelize, DataTypes) => {
    class GptHighlight extends Model {
        static associate(models) {
            GptHighlight.belongsTo(models.Account, {
                foreignKey: {
                    allowNull: false,
                },
            })
            GptHighlight.belongsTo(models.Content, {
                foreignKey: {
                    allowNull: false,
                },
            })
        }
    }
    GptHighlight.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        group: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        content: {
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
        modelName: 'GptHighlight',
        tableName: 'gptHighlights',
        paranoid: true,
    })
    sequelizePaginate.paginate(GptHighlight)
    return GptHighlight
}
