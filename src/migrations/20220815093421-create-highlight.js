module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('highlights', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDv4,
            },
            content: {
                type: Sequelize.TEXT,
            },
            description: {
                type: Sequelize.TEXT,
            },
            ContentId: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'contents',
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
            order: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
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
        await queryInterface.dropTable('highlights')
    },
}
