const {
    Model,
} = require('sequelize')
const sequelizePaginate = require('sequelize-paginate')

module.exports = (sequelize, DataTypes) => {
    class Highlight extends Model {
        static associate(models) {
            Highlight.belongsTo(models.Account, {
                foreignKey: {
                    allowNull: false,
                },
            })
            Highlight.belongsTo(models.Content, {
                foreignKey: {
                    allowNull: false,
                },
            })
            Highlight.hasMany(models.HighlightLibrary, {
                foreignKey: 'parentId',
                constraints: false,
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
                scope: {
                    parentType: 'highlightLibrary',
                },

            })
            Highlight.hasMany(models.Message, {
                foreignKey: {
                    allowNull: false,
                },
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            })
            Highlight.hasMany(models.GptMessage, {
                foreignKey: {
                    allowNull: false,
                },
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            })
        }
    }
    Highlight.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        content: {
            type: DataTypes.TEXT,
        },
        description: {
            type: DataTypes.TEXT,
        },
        order: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
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
        modelName: 'Highlight',
        tableName: 'highlights',
        defaultScope: {
            order: [['order', 'ASC']],
        },
        paranoid: true,

    })
    sequelizePaginate.paginate(Highlight)

    return Highlight
}
