
module.exports = function (sequelize, DataTypes) {
    const Role = sequelize.define('Role', {
        title: {
            type: DataTypes.STRING
        },
        salary: {
            type: DataTypes.DECIMAL
        },
    });

    Role.associate = (models) => {
        Role.belongsTo(models.Department, {
            // as: "Department",
            // foreignKey: "department_id"
        })
    };

    return Role;
};