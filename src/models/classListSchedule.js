const {
    Model,
} = require('sequelize')
const sequelizePaginate = require('sequelize-paginate')

module.exports = (sequelize, DataTypes) => {
    class ClassListSchedule extends Model {
        static associate(models) {
            ClassListSchedule.belongsTo(models.Account, {
                foreignKey: {
                    allowNull: false,
                },
                onDelete: 'cascade',
            })
            ClassListSchedule.belongsTo(models.Organization, {
                foreignKey: {
                    allowNull: false,
                },
                onDelete: 'cascade',
            })
            ClassListSchedule.belongsTo(models.ClassList, {
                foreignKey: {
                    allowNull: false,
                },
                onDelete: 'cascade',
            })
            ClassListSchedule.belongsTo(models.Content, {
                foreignKey: {
                    allowNull: false,
                },
                onDelete: 'cascade',
            })
        }
    }
    ClassListSchedule.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        startDate: {
            type: DataTypes.DATE,
        },
        endDate: {
            type: DataTypes.DATE,
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
        modelName: 'ClassListSchedule',
        tableName: 'classList_Schedules',
        paranoid: true,
    })
    sequelizePaginate.paginate(ClassListSchedule)
    return ClassListSchedule
}
