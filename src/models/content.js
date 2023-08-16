const { Model } = require('sequelize')
const sequelizePaginate = require('sequelize-paginate')

module.exports = (sequelize, DataTypes) => {
    class Content extends Model {
        static associate(models) {
            Content.belongsTo(models.Account, {
                foreignKey: {
                    allowNull: false,
                },
                onDelete: 'cascade',
            })
            Content.belongsTo(models.User, {
                foreignKey: {
                    allowNull: false,
                },
                onDelete: 'cascade',
            })
            Content.hasMany(models.ContentLibrary, {
                foreignKey: 'parentId',
                constraints: false,
                onDelete: 'cascade',
                scope: {
                    parentType: 'ContentLibrary',
                },
            })
            Content.hasMany(models.Highlight, {
                foreignKey: {
                    allowNull: false,
                },
                onDelete: 'cascade',
            })
            Content.hasMany(models.GptHighlight, {
                foreignKey: {
                    allowNull: false,
                },
                onDelete: 'cascade',
            })
            Content.hasMany(models.Message, {
                foreignKey: {
                    allowNull: false,
                },
                onDelete: 'cascade',
            })
            Content.hasMany(models.ClassListSchedule, {
                foreignKey: {
                    allowNull: false,
                },
                onDelete: 'cascade',
            })
            Content.belongsToMany(models.ClassList, {
                through: 'classList_contents',
            })
        }
    }
    Content.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            title: {
                type: DataTypes.TEXT,
            },
            text: {
                type: DataTypes.TEXT,
            },
            description: {
                type: DataTypes.TEXT,
            },
            private: {
                type: DataTypes.BOOLEAN,
            },
            saleable: {
                type: DataTypes.BOOLEAN,
            },
            type: {
                type: DataTypes.STRING,
            },
            kind: {
                type: DataTypes.STRING,
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
        },
        {
            sequelize,
            modelName: 'Content',
            tableName: 'contents',
            paranoid: true,
        },
    )
    sequelizePaginate.paginate(Content)
    return Content
}
