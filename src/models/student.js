const {
    Model,
} = require('sequelize')
const sequelizePaginate = require('sequelize-paginate')
const { EmailService } = require('../services')

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
            Student.hasMany(models.MessageSchedule, {
                foreignKey: {
                    allowNull: false,
                },
                onDelete: 'cascade',
            })
            Student.hasMany(models.MessageScheduleAnswer, {
                foreignKey: {
                    allowNull: false,
                },
                onDelete: 'cascade',
            })
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
    Student.prototype.messageEmail = async function (contentName, hash) {
        return EmailService.messageEmail(
            this.email,
            contentName,
            hash
        )
    }
    sequelizePaginate.paginate(Student)
    return Student
}
