import { SportEventTableName } from '../../modules/sport-event/sport-event.model';
import { QueryInterface } from 'sequelize';

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert(SportEventTableName, [
      {
        event_name: 'Football: FCB vs RMA',
        odds: 1.5,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        event_name: 'Football: OLY vs ATM',
        odds: 2.90,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        event_name: 'Football: RSO vs FEN',
        odds: 1.1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        event_name: 'Football: RMA vs STU',
        odds: 1.45,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ]);
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete(SportEventTableName, {});
  },
}; 