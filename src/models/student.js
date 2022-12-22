const {
    Model,
} = require('sequelize')
const sequelizePaginate = require('sequelize-paginate')

module.exports = (sequelize, DataTypes) => {
    class Student extends Model {
        static associate(models) {
            Student.belongsTo(models.Account, {
                foreignKey: {
                    allowNull: false,
                },
                onDelete: 'cascade',
            })
            Student.belongsTo(models.Organization, {
                foreignKey: {
                    allowNull: false,
                },
                onDelete: 'cascade',
            })
            Student.belongsToMany(models.ClassList, { through: 'classList_students' })
        }
    }
    Student.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        mobilePhone: {
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
        modelName: 'Student',
        tableName: 'students',
        paranoid: true,
    })
    sequelizePaginate.paginate(Student)
    return Student
}
