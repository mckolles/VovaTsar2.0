'use strict';



/** @type {import('sequelize-cli').Seed} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const competitorsFilesData = [
      {
        competitors_id: 1,
        image:'http://localhost:4000/images/13072023-135408_460-n7FkFNtMTEg.jpg',
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
      {
        competitors_id: 1,
        image: 'http://localhost:4000/images/13072023-135422_030-CO5TAVo5980.jpg',
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
      {
        competitors_id: 2,
        image: 'http://localhost:4000/images/13072023-135833_251-qZZ39a89pO0.jpg',
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
    
      {
        competitors_id: 2,
        image: 'http://localhost:4000/images/13072023-140614_025-kartinki-privet-11-vova.jpg',
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
      {
        competitors_id: 3,
        image: 'http://localhost:4000/images/13072023-140620_382-name_9964.jpg',
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
      {
        competitors_id: 3,
        image: 'http://localhost:4000/images/13072023-140624_208-name_7931.jpg',
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
      {
        competitors_id: 4,
        image: 'http://localhost:4000/images/13072023-135833_251-qZZ39a89pO0.jpg',
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