const {
    Model,
} = require('sequelize')
const sequelizePaginate = require('sequelize-paginate')

module.exports = (sequelize, DataTypes) => {
    class ContentLibrary extends Model {
        static associate(models) {
            ContentLibrary.belongsTo(models.Content, {
                foreignKey: 'parentId',
            })
            ContentLibrary.belongsTo(models.Account, {
                foreignKey: {
                    allowNull: true,
                },
                onDelete: 'cascade',
            })
        }
    }
    ContentLibrary.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        title: {
            type: DataTypes.TEXT,
        },
        description: {
            type: DataTypes.TEXT,
        },
        link: {
            type: DataTypes.STRING,
        },
        filename: {
            type: DataTypes.STRING,
        },
        url: {
            type: DataTypes.STRING,
        },
        type: {
            type: DataTypes.STRING,
        },
        mimetype: {
            type: DataTypes.STRING,
        },
        tags: {
            type: DataTypes.STRING,
        },
        parentId: {
            type: DataTypes.UUID,
        },
        parentType: {
            type: DataTypes.STRING,
            defaultValue: 'contentLibrary',
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
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
        modelName: 'ContentLibrary',
        tableName: 'libraries',
        defaultScope: {
            where: {
                parentType: 'contentLibrary',
            },
        },
        paranoid: true,
    })
    sequelizePaginate.paginate(ContentLibrary)

    return ContentLibrary
}
