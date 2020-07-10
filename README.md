# How to do setup:

First, run 'npm install' in your command line to install the node dependencies.

Second, create a database named "employee_db" on your local machine.

Third, modify config/config.json with the name and password used to login to the local database you created.

Fourth, run /schemas/init.js; this will create the table structures in your database that you will need. Be careful not to run this often; it wipes out all data inside of your database tables every time you run it.

optionally if you want to seed the database, you can use our seeder by running the command:
npx sequelize-cli db:seed:all

Finally, run 'node server.js' in your console to use the application.
