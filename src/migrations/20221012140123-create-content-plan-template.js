module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('contentPlan_templates', {
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
                allowNull: false,
                references: {
                    model: 'accounts',
                    key: 'id',
                },
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            },
            CollectionId: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'collections',
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
            DynamicFormId: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'dynamic_forms',
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
        await queryInterface.dropTable('contentPlan_templates')
    },
}
