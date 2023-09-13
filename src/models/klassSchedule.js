const { Model } = require('sequelize')
const sequelizePaginate = require('sequelize-paginate')

module.exports = (sequelize, DataTypes) => {
    class KlassSchedule extends Model {
        static associate(models) {
            KlassSchedule.belongsTo(models.Account, {
                foreignKey: {
                    allowNull: false,
                },
            })
            KlassSchedule.belongsTo(models.Organization, {
                foreignKey: {
                    allowNull: false,
                },
            })
            KlassSchedule.belongsTo(models.Klass, {
                foreignKey: {
                    allowNull: false,
                },
            })
            KlassSchedule.hasMany(models.MessageSchedule, {
                foreignKey: {
                    allowNull: false,
                },
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            })
        }
    }
    KlassSchedule.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
            },
            startDate: {
                type: DataTypes.DATE,
            },
            endDate: {
                type: DataTypes.DATE,
            },
            messageRepetition: {
                type: DataTypes.INTEGER,
            },
            sendMessageRandom: {
                type: DataTypes.BOOLEAN,
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
        },
        {
            sequelize,
            modelName: 'KlassSchedule',
            tableName: 'klassSchedules',
            paranoid: true,
        },
    )
    sequelizePaginate.paginate(KlassSchedule)
    return KlassSchedule
}
