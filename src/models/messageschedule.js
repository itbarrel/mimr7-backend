const { Model } = require('sequelize')
const sequelizePaginate = require('sequelize-paginate')

module.exports = (sequelize, DataTypes) => {
    class MessageSchedule extends Model {
        static associate(models) {
            MessageSchedule.belongsTo(models.Account, {
                foreignKey: {
                    allowNull: false,
                },
            })
            MessageSchedule.belongsTo(models.Student, {
                foreignKey: {
                    allowNull: false,
                },
            })
            MessageSchedule.belongsTo(models.Message, {
                foreignKey: {
                    allowNull: false,
                },
            })
            MessageSchedule.hasOne(models.MessageScheduleAnswer, {
                foreignKey: {
                    allowNull: false,
                },
                onDelete: 'RESTRICT',
                onUpdate: 'RESTRICT',
            })
            MessageSchedule.belongsTo(models.KlassSchedule, {
                foreignKey: {
                    allowNull: false,
                },
            })
        }
    }
    MessageSchedule.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            hash: {
                type: DataTypes.STRING,
            },
            answerStatus: {
                type: DataTypes.BOOLEAN,
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
            modelName: 'MessageSchedule',
            tableName: 'messageSchedules',
            paranoid: true,
        },
    )
    sequelizePaginate.paginate(MessageSchedule)

    return MessageSchedule
}
