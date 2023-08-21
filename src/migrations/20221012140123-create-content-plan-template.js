module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('contentPlanTemplates', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDv4,
            },
            content_activated: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
            scheduled_date: {
                type: Sequelize.DATE,
            },
            status: {
                type: Sequelize.STRING,
                defaultValue: 'made',
            },
            schedule_type: {
                type: Sequelize.STRING,
            },
            start_time: {
                type: Sequelize.DATE,
            },
            pause_date: {
                type: Sequelize.DATE,
            },
            resume_date: {
                type: Sequelize.DATE,
            },
            play_date: {
                type: Sequelize.DATE,
            },
            AccountId: {
                type: Sequelize.UUID,
                references: {
                    model: {
                        tableName: 'accounts',
                        schema: 'public',
                    },
                    key: 'id',
                },
                allowNull: false,
            },
            ContentId: {
                type: Sequelize.UUID,
                references: {
                    model: {
                        tableName: 'contents',
                        schema: 'public',
                    },
                    key: 'id',
                },
                allowNull: false,
            },
            klassId: {
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
            DynamicFormId: {
                type: Sequelize.UUID,
                references: {
                    model: {
                        tableName: 'dynamicForms',
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
        await queryInterface.dropTable('contentPlanTemplates')
    },
}
