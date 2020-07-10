const inquirer = require("inquirer");
const db = require("./models/index");
const questions = require("./questions/index");

db.sequelize.authenticate()
    .then(() => {
        console.log('Database connected...');
        mainMenu(); // get the program started
    })
    .catch(
        //(err) => console.log("Error: " + err)
    );


// the menu tree for viewing the Main Menu
function mainMenu() {
    inquirer
        .prompt(questions.mainMenu)
        .then(answers => {
            switch (answers.answers) {
                case (0): view();
                    break;
                case (1): addItem();
                    break;
                case (2): update();
                    break;
                case (3): deleteItem();
                    break;
                case (4): console.log('Thanks, see you again someday!');
                    break;
                default:
                    console.log('selection error');
            }
        })
        .catch(error => {
        });
};

// The menu tree for viewing items from the database
function view() {
    inquirer
        .prompt(questions.view)
        .then(answers => {
            switch (answers.answers) {
                case (0):
                    db.Department.findAll()
                        .then((data) => {
                            printerD(data);
                            view();
                        })
                    break;
                case (1):
                    db.Role.findAll()
                        .then((data) => {
                            printerR(data);
                            view();
                        })
                    break;
                case (2):
                    db.Employee.findAll()
                        .then((data) => {

                            printerE(data);
                            view();
                        })
                    break;
                case (3):
                    db.Employee.findAll({
                        where: {
                            ManagerID: null
                        }
                    })
                        .then((data) => {
                            const choices = [];
                            data.forEach(element => {
                                let manager = {
                                    name: element.dataValues.first_name + ' ' + element.dataValues.last_name,
                                    value: element.dataValues.id
                                }
                                choices.push(manager);
                            });

                            inquirer
                                .prompt([
                                    {
                                        type: "list",
                                        name: "answers",
                                        message: "Select a manager please:",
                                        choices: choices
                                    }
                                ])
                                .then(answers => {
                                    db.Employee.findAll({
                                        where: {
                                            ManagerID: answers.answers // this is the manager's id that was selected
                                        }
                                    })
                                        .then((data) => {
                                            printerE(data);
                                            view();
                                        })
                                });
                        })
                    break;
                case (4): // sum up all the salaries of everyone in a specific department
                    mainMenu();
                    break;
                case (5):
                    console.log('------------------------');
                    mainMenu();
                    break;
                default:
                    console.log('selection error');
            }
        })
        .catch(error => {
        });
};

async function addItem() {
    inquirer
        .prompt(questions.add)
        .then(answers => {
            switch (answers.answers) {
                case (0):
                    inquirer
                        .prompt([
                            {
                                type: "input",
                                name: "name",
                                message: "Name your new department:",
                            }
                        ])
                        .then(async (answers) => {
                            const depo = await db.Department.create({ name: answers.name });
                            console.log('New department ' + depo.name + ' added!');
                            mainMenu();
                        })
                    break;
                case (1):
                    inquirer
                        .prompt([
                            {
                                type: "input",
                                name: "title",
                                message: "What's the title for your new role:",
                            },
                            {
                                type: "input",
                                name: "salary",
                                message: "What's the salary for your new role:",
                            },
                            {
                                type: "number",
                                name: "DepartmentId",
                                message: "What department id-number does this role belong to? (optional)",
                            }
                        ])
                        .then(async (answers) => {
                            const { title, salary, DepartmentId } = answers
                            const role = await db.Role.create({ title, salary, DepartmentId });
                            console.log('New role ' + role.title + ' added!');
                            mainMenu();
                        })
                    break;
                case (2):
                    inquirer
                        .prompt([
                            {
                                type: "input",
                                name: "first_name",
                                message: "What's the employee's first name:",
                            },
                            {
                                type: "input",
                                name: "last_name",
                                message: "What's the employee's last name:",
                            },
                            {
                                type: "number",
                                name: "RoleId",
                                message: "For this employee's role, what is the role id number? (optional)",
                            },
                            {
                                type: "number",
                                name: "ManagerId",
                                message: "What is the employee id number of this employee's manager? (optional)",
                            },
                        ])
                        .then(async (answers) => {
                            const { first_name, last_name, RoleId, ManagerId } = answers
                            const employee = await db.Employee.create({ first_name, last_name, RoleId, ManagerId });
                            console.log('New employee ' + employee.first_name + ' ' + employee.last_name + ' added!');
                            mainMenu();
                        })
                    break;
                case (3):
                    mainMenu();
                    break;
            }
        });
};

async function update() {
    inquirer
        .prompt(questions.update)
        .then(async (answers) => {
            switch (answers.answers) {
                case 0: case 1:
                    const choices = [];
                    const data = await db.Employee.findAll();
                    data.forEach(element => {
                        let name = '    ' + element.dataValues.first_name + ' ' + element.dataValues.last_name;
                        let value = element.dataValues.id;
                        choices.push({ name, value });
                    });
                    inquirer
                        .prompt([{
                            type: "list",
                            name: "employeeId",
                            message: "Select an employee: ",
                            choices: choices
                        }])
                        .then(response => {
                            if (answers.answers === 0) { // change an employee's role
                                inquirer
                                    .prompt([{
                                        type: "number",
                                        name: "id",
                                        message: "Type in the employee's new role id number: "
                                    }])
                                    .then(async (ans) => {
                                        await db.Employee.update({ RoleId: ans.id }, {
                                            where: {
                                                id: response.employeeId
                                            }
                                        });
                                        console.log('Employee role updated.');
                                        mainMenu();
                                    });
                            }
                            else { // change an employee's manager
                                inquirer
                                    .prompt([{
                                        type: "number",
                                        name: "id",
                                        message: "Type in the employee's new manager's id number: "
                                    }])
                                    .then(async (ans) => {
                                        await db.Employee.update({ ManagerId: ans.id }, {
                                            where: {
                                                id: response.employeeId
                                            }
                                        });
                                        console.log("Employee's manager has been updated");
                                        mainMenu();
                                    });
                            }
                        })
                    break;
                case 2:
                    mainMenu();
                    break;
            }
        });
};

function deleteItem() {
    inquirer
        .prompt(questions.delete)
        .then(answers => {
            switch (answers.answers) {
                case 0:
                    deleteQuery('department', db.Department);
                    break;
                case 1:
                    deleteQuery('role', db.Role);
                    break;
                case 2:
                    deleteQuery('employee', db.Employee);
                    break;
                case 3:
                    mainMenu();
                    break;
            }
        });
};

async function deleteQuery(type, table) {
    inquirer
        .prompt([{
            type: "number",
            name: "id",
            message: `Type in the id-number of the ${type} you'd like to delete`
        }])
        .then(async (answer) => {
            await table.destroy({
                where: {
                    id: answer.id
                }
            });
            console.log(`We deleted the corresponding ${type}`);
            mainMenu();
        });

};

// prints employee names
function printerE(data) {
    console.log('Outputting all employees:');
    data.forEach(element => {
        console.log('    ' + element.dataValues.first_name + ' ' + element.dataValues.last_name);
    });
    console.log('------------------------');
};

// prints roles
function printerR(data) {
    console.log('Outputting all roles:');
    data.forEach(element => {
        console.log('    ' + element.dataValues.title);
    });
    console.log('------------------------');
};

// prints departments
function printerD(data) {
    console.log('Outputting all departments:');
    data.forEach(element => {
        console.log('    ' + element.dataValues.name);
    });
    console.log('------------------------');
};
