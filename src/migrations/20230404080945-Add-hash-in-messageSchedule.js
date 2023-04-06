module.exports = {
    up(queryInterface, Sequelize) {
        return queryInterface.addColumn(
            'messageSchedules',
            'hash',
            Sequelize.STRING,
        )
    },

    down(queryInterface) {
        return queryInterface.removeColumn(
            'messageSchedules',
            'hash',
        )
    },
}
