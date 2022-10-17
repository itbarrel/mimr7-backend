module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('dynamic_forms', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDv4,
            },
            name: {
                type: Sequelize.STRING,
            },
            fields: {
                type: Sequelize.JSON,
            },
            heading: {
                type: Sequelize.TEXT,
            },
            page_link: {
                type: Sequelize.STRING,
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
        await queryInterface.dropTable('dynamic_forms')
    },
}
