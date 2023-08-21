module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('users', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDv4,
            },
            userName: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            firstName: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            middleName: {
                type: Sequelize.STRING,
            },
            lastName: {
                type: Sequelize.STRING,
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            avatar: {
                type: Sequelize.TEXT,
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            resetPasswordToken: {
                type: Sequelize.TEXT,
            },
            RoleId: {
                type: Sequelize.UUID,
                references: {
                    model: {
                        tableName: 'roles',
                        schema: 'public',
                    },
                    key: 'id',
                },
                allowNull: false,
            },
            officePhone: {
                type: Sequelize.STRING,
            },
            mobilePhone: {
                type: Sequelize.STRING,
            },
            countryCode: {
                type: Sequelize.STRING,
            },
            country: {
                type: Sequelize.STRING,
            },
            lastEmailActivation: {
                type: Sequelize.DATE,
            },
            lastUpdatePassword: {
                type: Sequelize.DATE,
            },
            previousEmail: {
                type: Sequelize.STRING,
            },
            available: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
            type: {
                type: Sequelize.STRING,
            },
            active: {
                type: Sequelize.BOOLEAN,
                defaultValue: true,
            },
            AccountId: {
                type: Sequelize.UUID,
                references: {
                    model: {
                        tableName: 'accounts',
                        schema: 'public',
                    },
                    key: 'id',
                },
                allowNull: true,
            },
            OrganizationId: {
                type: Sequelize.UUID,
                references: {
                    model: {
                        tableName: 'organizations',
                        schema: 'public',
                    },
                    key: 'id',
                },
                allowNull: true,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: true,
                type: Sequelize.DATE,
            },
            deletedAt: {
                allowNull: true,
                type: Sequelize.DATE,
            },
        })
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable('users')
    },
}
