module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('messageSchedules', 'KlassScheduleId', {
            allowNull: false,
            type: Sequelize.UUID,
            references: {
                model: {
                    tableName: 'klassSchedules',
                    schema: 'public',
                },
                key: 'id',
            },
        })
    },

    async down(queryInterface) {
        await queryInterface.removeColumn('messageSchedules', 'KlassScheduleId')
    },
}
