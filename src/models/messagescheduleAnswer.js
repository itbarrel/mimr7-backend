const {
    Model,
} = require('sequelize')
const sequelizePaginate = require('sequelize-paginate')

module.exports = (sequelize, DataTypes) => {
    class MessageScheduleAnswer extends Model {
        static associate(models) {
            MessageScheduleAnswer.belongsTo(models.Account, {
                foreignKey: {
                    allowNull: false,
                },
                onDelete: 'cascade',
            })
            MessageScheduleAnswer.belongsTo(models.Student, {
                foreignKey: {
                    allowNull: false,
                },
                onDelete: 'cascade',
            })
            MessageScheduleAnswer.belongsTo(models.MessageSchedule, {
                foreignKey: {
                    allowNull: false,
                },
                onDelete: 'cascade',
            })
        }
    }
    MessageScheduleAnswer.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        response: {
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
        modelName: 'MessageScheduleAnswer',
        tableName: 'messageScheduleAnswers',
        paranoid: true,
    })
    sequelizePaginate.paginate(MessageScheduleAnswer)

    return MessageScheduleAnswer
}
