'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Seed the department table
    await queryInterface.bulkInsert('Departments', [
      { name: 'Product Development', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Sales', createdAt: new Date(), updatedAt: new Date() },
    ], {});

    const departments = await queryInterface.sequelize.query(
      `SELECT id from Departments;`
    );
    const departmentRows = departments[0];

    // Seed the roles table
    await queryInterface.bulkInsert('Roles', [
      {
        title: 'Product Manager', salary: 80000, DepartmentId: departmentRows[0].id,
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        title: 'Technical Engineer', salary: 95000, DepartmentId: departmentRows[0].id,
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        title: 'Sales Agent', salary: 45000, DepartmentId: departmentRows[1].id,
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        title: 'VP of Sales', salary: 120000, DepartmentId: departmentRows[1].id,
        createdAt: new Date(), updatedAt: new Date()
      },
    ], {});

    const roles = await queryInterface.sequelize.query(
      `SELECT id from Roles;`
    );
    const roleRows = roles[0];
    console.log(roleRows);

    // Seed the Employees table

    return await queryInterface.bulkInsert('Employees', [
      {
        first_name: 'Paul', last_name: 'Fidika',
        RoleId: roleRows[0].id, ManagerId: null,
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        first_name: 'Tristan', last_name: 'Wagner',
        RoleId: roleRows[1].id, ManagerId: 1,
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        first_name: 'Hunter', last_name: 'Melnick',
        RoleId: roleRows[1].id, ManagerId: 1,
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        first_name: 'Michael', last_name: 'Ostrow',
        RoleId: roleRows[3].id, ManagerId: null,
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        first_name: 'Harry', last_name: 'Ballard',
        RoleId: roleRows[2].id, ManagerId: 4,
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        first_name: 'Adam', last_name: 'Escobedo',
        RoleId: roleRows[2].id, ManagerId: 4,
        createdAt: new Date(), updatedAt: new Date()
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Departments', null, {});
    await queryInterface.bulkDelete('Roles', null, {});
    await queryInterface.bulkDelete('Employees', null, {});
  }
};

// createdAt: new Date(), updatedAt: new Date() 

/**
 * Add seed commands here.
 *
 * Example:
 * await queryInterface.bulkInsert('People', [{
 *   name: 'John Doe',
 *   isBetaMember: false
 * }], {});
*/

/**
 * Add commands to revert seed here.
 *
 * Example:
 * await queryInterface.bulkDelete('People', null, {});
 */

 // npx sequelize-cli seed:generate --name demo-user - creates seed file
 // npx sequelize-cli db:seed:all - runs side file
 // npx sequelize-cli db:seed:undo:all - undoes seed file

// return queryInterface.bulkInsert('Employee', [
//   {
//     first_name: 'Paul',
//     last_name: 'Fidika',
//     createdAt: new Date(),
//     updatedAt: new Date()
//   }
// ]);