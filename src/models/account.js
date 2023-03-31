const {
    Model,
} = require('sequelize')

const sequelizePaginate = require('sequelize-paginate')
const IDGenerator = require('../utils/IdGenerator')

module.exports = (sequelize, DataTypes) => {
    class Account extends Model {
        static associate(models) {
            Account.hasMany(models.User, {
                foreignKey: {
                    allowNull: true,
                },
                onDelete: 'cascade',
            })
            Account.hasMany(models.Organization, {
                foreignKey: {
                    allowNull: false,
                },
                onDelete: 'cascade',
            })
            Account.hasMany(models.Role, {
                foreignKey: {
                    allowNull: true,
                },
                onDelete: 'cascade',
            })
            Account.hasMany(models.Content, {
                foreignKey: {
                    allowNull: false,
                },
                onDelete: 'cascade',
            })
            Account.hasMany(models.ContentLibrary, {
                foreignKey: {
                    allowNull: false,
                },
                onDelete: 'cascade',
            })
            Account.hasMany(models.Highlight, {
                foreignKey: {
                    allowNull: false,
                },
                onDelete: 'cascade',
            })
            Account.hasMany(models.Player, {
                foreignKey: {
                    allowNull: false,
                },
                onDelete: 'cascade',
            })
            Account.hasMany(models.Location, {
                foreignKey: {
                    allowNull: false,
                },
                onDelete: 'cascade',
            })
            Account.hasMany(models.Message, {
                foreignKey: {
                    allowNull: false,
                },
                onDelete: 'cascade',
            })
            Account.hasMany(models.ClassList, {
                foreignKey: {
                    allowNull: false,
                },
                onDelete: 'cascade',
            })
            Account.hasMany(models.DynamicForm, {
                foreignKey: {
                    allowNull: false,
                },
                onDelete: 'cascade',
            })
            Account.hasMany(models.ContentplanTemplate, {
                foreignKey: {
                    allowNull: false,
                },
                onDelete: 'cascade',
            })
            Account.hasMany(models.Student, {
                foreignKey: {
                    allowNull: false,
                },
                onDelete: 'cascade',
            })
            Account.hasMany(models.ClassListSchedule, {
                foreignKey: {
                    allowNull: false,
                },
                onDelete: 'cascade',
            })
            Account.hasMany(models.MessageSchedule, {
                foreignKey: {
                    allowNull: false,
                },
                onDelete: 'cascade',
            })
        }
    }

    Account.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: DataTypes.TEXT,
        apikey: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        organizationName: {
            type: DataTypes.STRING,
        },
        avatar: {
            type: DataTypes.STRING,
        },
        type: {
            type: DataTypes.STRING,
        },
        category_header: {
            type: DataTypes.STRING,
        },
        messages_font_size: {
            type: DataTypes.STRING,
        },
        messages_font_family: {
            type: DataTypes.STRING,
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        public: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
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
        modelName: 'Account',
        tableName: 'accounts',
        paranoid: true,
        // class methods
        classMethods: {
            active: async () => { },
        },
        hooks: {
            // eslint-disable-next-line no-unused-vars
            beforeValidate(account) {
                // eslint-disable-next-line no-param-reassign
                account.apikey = IDGenerator(32)
                return account
            },

        },
    })
    sequelizePaginate.paginate(Account)
    return Account
}
