module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn(
            'klassSchedules',
            'name',
            {
                type: Sequelize.STRING,
            },
        )
    },

    down: async (queryInterface) => {
        await queryInterface.removeColumn('klassSchedules', 'name')
    },
}
