const {
    Model,
} = require('sequelize')
const sequelizePaginate = require('sequelize-paginate')

module.exports = (sequelize, DataTypes) => {
    class ContentplanTemplate extends Model {
        static associate(models) {
            ContentplanTemplate.belongsTo(models.Account, {
                foreignKey: {
                    allowNull: false,
                },
                onDelete: 'cascade',
            })
            ContentplanTemplate.belongsTo(models.Content, {
                foreignKey: {
                    allowNull: false,
                },
                onDelete: 'cascade',
            })
            ContentplanTemplate.belongsTo(models.Klass, {
                foreignKey: {
                    allowNull: false,
                },
                onDelete: 'cascade',
            })
            ContentplanTemplate.belongsTo(models.DynamicForm, {
                foreignKey: {
                    allowNull: false,
                },
                onDelete: 'cascade',
            })
        }
    }
    ContentplanTemplate.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        content_activated: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        scheduled_date: {
            type: DataTypes.DATE,
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: 'made',
        },
        schedule_type: {
            type: DataTypes.STRING,
        },
        start_time: {
            type: DataTypes.DATE,
        },
        pause_date: {
            type: DataTypes.DATE,
        },
        resume_date: {
            type: DataTypes.DATE,
        },
        play_date: {
            type: DataTypes.DATE,
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
        modelName: 'ContentplanTemplate',
        tableName: 'contentPlanTemplates',
        paranoid: true,
    })
    sequelizePaginate.paginate(ContentplanTemplate)

    return ContentplanTemplate
}
