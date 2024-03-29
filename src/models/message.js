const { Model } = require('sequelize')
const sequelizePaginate = require('sequelize-paginate')

module.exports = (sequelize, DataTypes) => {
    class Message extends Model {
        static associate(models) {
            Message.belongsTo(models.Account, {
                foreignKey: {
                    allowNull: false,
                },
            })
            Message.belongsTo(models.Content, {
                foreignKey: {
                    allowNull: false,
                },
            })
            Message.belongsTo(models.Highlight, {
                foreignKey: {
                    allowNull: false,
                },
            })
            Message.hasMany(models.MessageSchedule, {
                foreignKey: {
                    allowNull: false,
                },
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            })
        }
    }
    Message.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            name: {
                type: DataTypes.TEXT,
            },
            hint: {
                type: DataTypes.TEXT,
            },
            solution: {
                type: DataTypes.TEXT,
            },
            number: {
                type: DataTypes.INTEGER,
            },
            type: {
                type: DataTypes.STRING,
            },
            offset: {
                type: DataTypes.INTEGER,
            },
            order: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
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
            modelName: 'Message',
            tableName: 'messages',
            paranoid: true,
        },
    )
    sequelizePaginate.paginate(Message)

    return Message
}
