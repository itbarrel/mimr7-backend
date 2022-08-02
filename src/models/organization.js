'use strict';
const {
  Model
} = require('sequelize');
const sequelizePaginate = require('sequelize-paginate')

module.exports = (sequelize, DataTypes) => {
  class Organization extends Model {

    static associate(models) {
      // define association here
    }
  };
  Organization.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
    },
    region: {
      type: DataTypes.STRING,
    },
    state: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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
    modelName: 'Organization',
    tableName: 'organizations',
    paranoid: true,
  });
  sequelizePaginate.paginate(Organization)

  return Organization;
};
