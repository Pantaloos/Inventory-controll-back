"use strict";

const uuid = require("uuid");

const itemLocations = [
  "Main Office",
  "Cavea Gallery",
  "Cavea Tbilisi Mall",
  "Cavea East Point",
  "Cavea City Mall",
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const CHUNK_SIZE = 10000;
    const SEED_SIZE = 300000;
    const TOTAL_ITER = SEED_SIZE / CHUNK_SIZE;

    for (let iter = 0; iter < TOTAL_ITER; ++iter) {
      const generated_data = Array.from({ length: CHUNK_SIZE }, (_, i) => ({
        id: uuid.v4(),
        name: `Item №${iter * CHUNK_SIZE + i}`,
        location:
          itemLocations[Math.floor(Math.random() * itemLocations.length)],
        price: Math.floor(Math.random() * 50),
        createdAt: new Date(),
        updatedAt: new Date(),
      }));

      await queryInterface.bulkInsert("Items", generated_data);
    }
  },

  async down(queryInterface, Sequelize) {},
};
