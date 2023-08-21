module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('messageScheduleAnswers', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDv4,
            },
            response: {
                allowNull: false,
                type: Sequelize.TEXT,
            },
            MessageScheduleId: {
                type: Sequelize.UUID,
                references: {
                    model: {
                        tableName: 'messageSchedules',
                        schema: 'public',
                    },
                    key: 'id',
                },
                allowNull: false,
            },
            StudentId: {
                type: Sequelize.UUID,
                references: {
                    model: {
                        tableName: 'students',
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
        await queryInterface.dropTable('messageScheduleAnswers')
    },
}
