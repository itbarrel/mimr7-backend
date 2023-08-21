module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('klassContents', {
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
        await queryInterface.dropTable('klassContents')
    },
}
