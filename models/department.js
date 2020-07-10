
module.exports = function (sequelize, DataTypes) {
    const Department = sequelize.define('Department', {
        // id: {
        //     type: DataTypes.INTEGER,
        //     primaryKey: true,
        //     autoIncrement: true
        // },
        name: {
            type: DataTypes.STRING
        }
    });

    return Department;
};