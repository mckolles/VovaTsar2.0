const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const CompetitorFiles = sequelize.define('competitorFiles', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      competitors_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'competitors',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      path:{
        type: Sequelize.STRING,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.NOW,
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull:true
      }
}, {
  tableName: 'competitors_files',
  timestamps: false,
});

module.exports = CompetitorFiles;
