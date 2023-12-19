module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.changeColumn('accounts', 'type', {
            type: Sequelize.ENUM('institute', 'personal'),
        })
    },

    down: async (queryInterface, Sequelize) => {
        queryInterface.changeColumn('accounts', 'type', {
            type: Sequelize.STRING,
        })
    },
}
