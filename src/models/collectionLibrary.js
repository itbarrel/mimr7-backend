const {
    Model,
} = require('sequelize')
const sequelizePaginate = require('sequelize-paginate')

module.exports = (sequelize, DataTypes) => {
    class CollectionLibrary extends Model {
        static associate(models) {
            CollectionLibrary.belongsTo(models.Collection, {
                foreignKey: 'parentId',
            })
            CollectionLibrary.belongsTo(models.Account, {
                foreignKey: {
                    allowNull: true,
                },
                onDelete: 'cascade',
            })
        }
    }
    CollectionLibrary.init({
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
            defaultValue: 'collectionLibrary',
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
        modelName: 'CollectionLibrary',
        tableName: 'libraries',
        defaultScope: {
            where: {
                parentType: 'collectionLibrary',
            },
        },
        paranoid: true,
    })
    sequelizePaginate.paginate(CollectionLibrary)

    return CollectionLibrary
}
