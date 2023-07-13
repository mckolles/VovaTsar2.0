'use strict';

/** @type {import('sequelize-cli').Seed} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const competitorsFilesData = [
      {
        competitors_id: 1,
        path: '/path/to/file1',
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
      {
        competitors_id: 1,
        path: '/path/to/file2',
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
      {
        competitors_id: 2,
        path: '/path/to/file3',
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
      {
        competitors_id: 2,
        path: '/path/to/file4',
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
      {
        competitors_id: 3,
        path: '/path/to/file5',
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
      {
        competitors_id: 3,
        path: '/path/to/file6',
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
      {
        competitors_id: 4,
        path: '/path/to/file7',
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
    ];

    await queryInterface.bulkInsert('competitors_files', competitorsFilesData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('competitors_files', null, {});
  }
};