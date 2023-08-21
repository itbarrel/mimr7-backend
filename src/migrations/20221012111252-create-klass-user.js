module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('klassUsers', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDv4,
            },
            UserId:
            {
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
            KlassId:
            {
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
        await queryInterface.dropTable('klassUsers')
    },
}
