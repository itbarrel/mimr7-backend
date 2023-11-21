module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('messageSchedules', 'answerStatus', {
            type: Sequelize.BOOLEAN,
        })
    },

    down: async (queryInterface) => {
        await queryInterface.removeColumn('messageSchedules', 'answerStatus')
    },
}
