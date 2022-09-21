'use strict';
const {
  Model
} = require('sequelize');
const sequelizePaginate = require('sequelize-paginate')

module.exports = (sequelize, DataTypes) => {
  class Player extends Model {

    static associate(models) {
      Player.belongsTo(models.Account, {
        foreignKey: {
          allowNull: false,
        },
        onDelete: 'cascade',
      })
      Player.belongsTo(models.User, {
        foreignKey: {
          allowNull: false,
        },
        onDelete: 'cascade',
      })
    }
  };
  Player.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING
    },
    lastName: {
      type: DataTypes.STRING
    },
    organizationName: {
      type: DataTypes.STRING
    },
    mobilePhone: {
      type: DataTypes.STRING
    },
    country: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    active: {
      type: DataTypes.BOOLEAN
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: true,
      type: DataTypes.DATE,
    },
    deletedAt: {
      allowNull: true,
      type: DataTypes.DATE,
    },
  }, {
    sequelize,
    modelName: 'Player',
    tableName: 'players',
    paranoid: true,
  });
  sequelizePaginate.paginate(Player)
  return Player;
};
