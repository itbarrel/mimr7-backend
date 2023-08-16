module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('gptHighlights', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDv4,
            },
            group: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
            },
            content: {
                type: Sequelize.TEXT,
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
        await queryInterface.dropTable('gptHighlights')
    },
}
