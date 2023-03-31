const {
    Model,
} = require('sequelize')
const sequelizePaginate = require('sequelize-paginate')

module.exports = (sequelize, DataTypes) => {
    class ClassList extends Model {
        static associate(models) {
            ClassList.belongsTo(models.Account, {
                foreignKey: {
                    allowNull: false,
                },
                onDelete: 'cascade',
            })
            ClassList.belongsTo(models.Organization, {
                foreignKey: {
                    allowNull: false,
                },
                onDelete: 'cascade',
            })
            ClassList.belongsToMany(models.User, { through: 'classList_users' })
            ClassList.belongsToMany(models.Student, { through: 'classList_students' })
            ClassList.belongsToMany(models.Content, { through: 'classList_contents' })
            ClassList.hasMany(models.ClassListSchedule, {
                foreignKey: {
                    allowNull: false,
                },
                onDelete: 'cascade',
            })
        }
    }
    ClassList.init({
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
    }, {
        sequelize,
        modelName: 'ClassList',
        tableName: 'classLists',
        paranoid: true,
    })
    sequelizePaginate.paginate(ClassList)
    return ClassList
}
