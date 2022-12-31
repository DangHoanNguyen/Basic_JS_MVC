'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {

  //Thêm giá trị trong đb?
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      email: 'example@example.com',
      password: '123456',
      firstName: 'John',
      lastName: 'Doe',
      address: 'Failure World',
      phoneNumber: '1234',
      gender: 1,
      image: 'wut?',
      roleId: "Doc",
      positionId: "CEO",
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },


  // Chạy khi rollback- khôi phục lại trạng thái cũ của db.
  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
