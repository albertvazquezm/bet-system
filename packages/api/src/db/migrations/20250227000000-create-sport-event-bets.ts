import { QueryInterface, DataTypes } from 'sequelize';
import { SportEventBetTableName } from '../../modules/sport-event/sport-event-bet.model';
module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable(SportEventBetTableName, {
      sport_event_bet_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      sport_event_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      bet_amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable(SportEventBetTableName);
  },
}; 