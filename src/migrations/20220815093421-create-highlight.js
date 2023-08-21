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
                references: {
                    model: {
                        tableName: 'contents',
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
