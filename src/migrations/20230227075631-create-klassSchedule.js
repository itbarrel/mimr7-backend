module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('klassSchedules', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDv4,
            },
            KlassId: {
                type: Sequelize.UUID,
                references: {
                    model: {
                        tableName: 'klasses',
                        schema: 'public',
                    },
                    key: 'id',
                },
                allowNull: false,
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
            OrganizationId: {
                type: Sequelize.UUID,
                references: {
                    model: {
                        tableName: 'organizations',
                        schema: 'public',
                    },
                    key: 'id',
                },
                allowNull: false,
            },
            messageRepetition: {
                type: Sequelize.INTEGER,
            },
            sendMessageRandom: {
                type: Sequelize.BOOLEAN,
            },
            startDate: {
                type: Sequelize.DATE,
            },
            endDate: {
                type: Sequelize.DATE,
            },
            active: {
                type: Sequelize.BOOLEAN,
                defaultValue: true,
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
        await queryInterface.dropTable('klassSchedules')
    },
}
