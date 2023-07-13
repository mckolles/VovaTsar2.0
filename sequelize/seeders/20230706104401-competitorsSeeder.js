'use strict';



/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const competitorsData = [
      {
        name: 'Competitor 1',
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
      {
        name: 'Competitor 2',
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
      {
        name: 'Competitor 3',
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
      {
        name: 'Competitor 4',
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
      {
        name: 'Competitor 5',
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
     
    ];

    await queryInterface.bulkInsert('competitors', competitorsData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('competitors', null, {});
  }
};

