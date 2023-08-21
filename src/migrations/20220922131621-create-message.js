module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('messages', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDv4,
            },
            name: {
                type: Sequelize.TEXT,
            },
            hint: {
                type: Sequelize.TEXT,
            },
            solution: {
                type: Sequelize.TEXT,
            },
            number: {
                type: Sequelize.INTEGER,
            },
            type: {
                type: Sequelize.STRING,
            },
            offset: {
                type: Sequelize.INTEGER,
            },
            order: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
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
            HighlightId: {
                type: Sequelize.UUID,
                references: {
                    model: {
                        tableName: 'highlights',
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
        await queryInterface.dropTable('messages')
    },
}
