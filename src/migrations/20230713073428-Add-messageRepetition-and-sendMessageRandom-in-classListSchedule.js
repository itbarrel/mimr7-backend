module.exports = {
    up(queryInterface, Sequelize) {
        return Promise.all([
            queryInterface.addColumn(
                'classList_Schedules',
                'messageRepetition',
                Sequelize.INTEGER,
            ),
            queryInterface.addColumn(
                'classList_Schedules',
                'sendMessageRandom',
                Sequelize.BOOLEAN,
            ),
        ])
    },

    down(queryInterface) {
        return Promise.all([
            queryInterface.removeColumn('classList_Schedules', 'messageRepetition'),
            queryInterface.removeColumn('classList_Schedules', 'sendMessageRandom'),
        ])
    },
}
