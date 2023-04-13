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
                allowNull: true,
                references: {
                    model: 'messageSchedules',
                    key: 'id',
                },
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            },
            StudentId: {
                type: Sequelize.UUID,
                allowNull: true,
                references: {
                    model: 'students',
                    key: 'id',
                },
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            },
            AccountId: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'accounts',
                    key: 'id',
                },
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
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
