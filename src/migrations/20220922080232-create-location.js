module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('locations', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDv4,
            },
            address1: {
                type: Sequelize.STRING,
            },
            address2: {
                type: Sequelize.STRING,
            },
            address3: {
                type: Sequelize.STRING,
            },
            city: {
                type: Sequelize.STRING,
            },
            state: {
                type: Sequelize.STRING,
            },
            country: {
                type: Sequelize.STRING,
            },
            mobilePhone: {
                type: Sequelize.STRING,
            },
            officePhone: {
                type: Sequelize.STRING,
            },
            type: {
                type: Sequelize.STRING,
            },
            location: {
                type: Sequelize.JSON,
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
        await queryInterface.dropTable('locations')
    },
}
