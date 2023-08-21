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
                references: {
                    model: {
                        tableName: 'accounts',
                        schema: 'public',
                    },
                    key: 'id',
                },
                allowNull: false,
            },
            ContentId: {
                type: Sequelize.UUID,
                references: {
                    model: {
                        tableName: 'contents',
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
        await queryInterface.dropTable('gptHighlights')
    },
}
