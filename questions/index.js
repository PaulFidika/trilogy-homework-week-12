module.exports = {
    mainMenu: [
        {
            type: "list",
            name: "answers",
            message: "Welcome to your new employee management system! What would you like to do today?",
            choices: [
                {
                    name: "View records",
                    value: 0
                },
                {
                    name: "Add a record",
                    value: 1
                },
                {
                    name: "Update a record",
                    value: 2
                },
                {
                    name: "Delete a record",
                    value: 3
                },
                {
                    name: "Exit",
                    value: 4
                }
            ]
        }
    ],
    view: [{
        type: "list",
        name: "answers",
        message: "What would you like to see?",
        choices: [
            {
                name: "List all departments",
                value: 0
            },
            {
                name: "List all roles",
                value: 1
            },
            {
                name: "List all employees",
                value: 2
            },
            {
                name: "List all employees under a specific manager",
                value: 3
            },
            {
                name: "View the total utilized budget of a department",
                value: 4
            },
            {
                name: "Go back",
                value: 5
            },
        ]
    }],
    add: [{
        type: "list",
        name: "answers",
        message: "What type of record would you like to add?",
        choices: [
            {
                name: "Add a department",
                value: 0
            },
            {
                name: "Add a role",
                value: 1
            },
            {
                name: "Add an employee",
                value: 2
            },
            {
                name: "Go back",
                value: 3
            }
        ]
    }],
    update: [{
        type: "list",
        name: "answers",
        message: "What would you like to update?",
        choices: [
            {
                name: "Change an employee's role",
                value: 0
            },
            {
                name: "Change an employee's manager",
                value: 1
            },
            {
                name: "Go back",
                value: 2
            }
        ]
    }],
    delete: [{
        type: "list",
        name: "answers",
        message: "What would you like to delete from the system?",
        choices: [
            {
                name: "Delete a department",
                value: 0
            },
            {
                name: "Delete a role",
                value: 1
            },
            {
                name: "Delete an employee",
                value: 2
            },
            {
                name: "Go back",
                value: 3
            }
        ]
    }],
};
