const {
    Model,
} = require('sequelize')
const sequelizePaginate = require('sequelize-paginate')

module.exports = (sequelize, DataTypes) => {
    class DynamicForm extends Model {
        static associate(models) {
            DynamicForm.belongsTo(models.Account, {
                foreignKey: {
                    allowNull: false,
                },
                onDelete: 'cascade',
            })
            DynamicForm.hasMany(models.ContentplanTemplate, {
                foreignKey: {
                    allowNull: false,
                },
                onDelete: 'cascade',
            })
        }
    }
    DynamicForm.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
        },
        fields: {
            type: DataTypes.JSON,
        },
        heading: {
            type: DataTypes.TEXT,
        },
        page_link: {
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
    }, {
        sequelize,
        modelName: 'DynamicForm',
        tableName: 'dynamicForms',
        paranoid: true,
    })
    sequelizePaginate.paginate(DynamicForm)
    return DynamicForm
}
