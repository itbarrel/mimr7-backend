module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('players', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDv4,
            },
            firstName: {
                type: Sequelize.STRING,
            },
            lastName: {
                type: Sequelize.STRING,
            },
            organizationName: {
                type: Sequelize.STRING,
            },
            mobilePhone: {
                type: Sequelize.STRING,
            },
            country: {
                type: Sequelize.STRING,
            },
            active: {
                type: Sequelize.BOOLEAN,
            },
            email: {
                type: Sequelize.STRING,
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
                allowNull: false,
            },
            UserId: {
                type: Sequelize.UUID,
                references: {
                    model: {
                        tableName: 'users',
                        schema: 'public',
                    },
                    key: 'id',
                },
                allowNull: false,
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
        await queryInterface.dropTable('players')
    },
}
