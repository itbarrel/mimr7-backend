module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('contents', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDv4,
            },
            title: {
                type: Sequelize.TEXT,
            },
            text: {
                type: Sequelize.TEXT,
            },
            description: {
                type: Sequelize.TEXT,
            },
            private: {
                type: Sequelize.BOOLEAN,
            },
            saleable: {
                type: Sequelize.BOOLEAN,
            },
            type: {
                type: Sequelize.STRING,
            },
            kind: {
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
        await queryInterface.dropTable('contents')
    },
}
