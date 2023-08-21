const { Model } = require('sequelize')
const sequelizePaginate = require('sequelize-paginate')

module.exports = (sequelize, DataTypes) => {
    class Klass extends Model {
        static associate(models) {
            Klass.belongsTo(models.Account, {
                foreignKey: {
                    allowNull: false,
                },
            })
            Klass.belongsTo(models.Organization, {
                foreignKey: {
                    allowNull: false,
                },
            })
            Klass.belongsToMany(models.User, { through: 'klassUsers' })
            Klass.belongsToMany(models.Student, {
                through: 'klassStudents',
            })
            Klass.belongsToMany(models.Content, {
                through: 'klassContents',
            })
            Klass.hasMany(models.ContentplanTemplate, {
                foreignKey: {
                    allowNull: false,
                },
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            })
            Klass.hasMany(models.KlassSchedule, {
                foreignKey: {
                    allowNull: false,
                },
            })
        }
    }
    Klass.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            name: {
                type: DataTypes.TEXT,
            },
            description: {
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
        },
        {
            sequelize,
            modelName: 'Klass',
            tableName: 'klasses',
            paranoid: true,
        },
    )
    sequelizePaginate.paginate(Klass)
    return Klass
}
