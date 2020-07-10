// if you runt his script, it will delete all data in the tables and recreate the 3 tables

const db = require('../models/index');

db.sequelize
    .sync({ force: true })
    .then(
        function (err) {
            console.log('It worked!');
        },
        function (err) {
            console.log('An error occurred while creating the table: ' + err);
        }
    );