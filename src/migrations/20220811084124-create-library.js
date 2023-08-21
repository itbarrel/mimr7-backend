module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('libraries', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDv4,
            },
            title: {
                type: Sequelize.TEXT,
            },
            description: {
                type: Sequelize.TEXT,
            },
            link: {
                type: Sequelize.STRING,
            },
            filename: {
                type: Sequelize.STRING,
            },
            url: {
                type: Sequelize.STRING,
            },
            type: {
                type: Sequelize.STRING,
            },
            mimetype: {
                type: Sequelize.STRING,
            },
            tags: {
                type: Sequelize.STRING,
            },
            parentId: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
            },
            parentType: {
                type: Sequelize.STRING,
            },
            active: {
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
        await queryInterface.dropTable('libraries')
    },
}
