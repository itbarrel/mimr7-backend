'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('gptMessages', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDv4,
      },
      group: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      name: {
        type: Sequelize.TEXT,
      },
      solution: {
        type: Sequelize.TEXT,
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
      HighlightId: {
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: 'highlights',
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
    await queryInterface.dropTable('gptMessages')
  },
}
