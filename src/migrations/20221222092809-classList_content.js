module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('classList_contents', {
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
            ClassListId: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'classLists',
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
        await queryInterface.dropTable('classList_contents')
    },
}
