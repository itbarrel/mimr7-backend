'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('organizations', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDv4,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      city: {
        type: Sequelize.STRING,
      },
      region: {
        type: Sequelize.STRING,
      },
      state: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      active: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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

    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('organizations');
  }
};
