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
                onDelete: 'cascade',
            })
            Highlight.belongsTo(models.Content, {
                foreignKey: {
                    allowNull: false,
                },
                onDelete: 'cascade',
            })
            Highlight.hasMany(models.HighlightLibrary, {
                foreignKey: 'parentId',
                constraints: false,
                onDelete: 'cascade',
                scope: {
                    parentType: 'highlightLibrary',
                },

            })
            Highlight.hasMany(models.Message, {
                foreignKey: {
                    allowNull: false,
                },
                onDelete: 'cascade',
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
