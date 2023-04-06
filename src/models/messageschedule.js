const {
    Model,
} = require('sequelize')
const sequelizePaginate = require('sequelize-paginate')

module.exports = (sequelize, DataTypes) => {
    class MessageSchedule extends Model {
        static associate(models) {
            MessageSchedule.belongsTo(models.Account, {
                foreignKey: {
                    allowNull: false,
                },
                onDelete: 'cascade',
            })
            MessageSchedule.belongsTo(models.Student, {
                foreignKey: {
                    allowNull: false,
                },
                onDelete: 'cascade',
            })
            MessageSchedule.belongsTo(models.Message, {
                foreignKey: {
                    allowNull: false,
                },
                onDelete: 'cascade',
            })
        }
    }
    MessageSchedule.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        count: {
            type: DataTypes.NUMBER,
            defaultValue: 0,
        },
        hash: {
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
        modelName: 'MessageSchedule',
        tableName: 'messageSchedules',
        paranoid: true,
    })
    sequelizePaginate.paginate(MessageSchedule)

    return MessageSchedule
}
