
module.exports = function (sequelize, DataTypes) {
    const Employee = sequelize.define('Employee', {
        first_name: {
            type: DataTypes.STRING
        },
        last_name: {
            type: DataTypes.STRING
        },
    });

    Employee.associate = (models) => {
        Employee.belongsTo(models.Role, {
            // as: "Role",
            // foreignKey: "role_id"
        });

        Employee.hasOne(models.Employee, {
            as: "Manager",
            // foreignKey: "manager_id"
        });
    };

    return Employee;
};