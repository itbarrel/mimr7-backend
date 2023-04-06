module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('messageSchedules', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDv4,
            },
            count: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
            },
            MessageId: {
                type: Sequelize.UUID,
                allowNull: true,
                references: {
                    model: 'messages',
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
        await queryInterface.dropTable('messageSchedules')
    },
}
