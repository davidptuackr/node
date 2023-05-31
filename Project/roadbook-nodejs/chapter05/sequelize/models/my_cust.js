module.exports = (sequelize, DataTypes) => {
    const schm_cust = sequelize.define(
        "my_cust",
        {
            custid: {
                type: DataTypes.STRING(20),
                allowNull: false,
                primaryKey: true
            },
            age: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            membership: {
                type: DataTypes.STRING(10),
                allowNull: false,
                defaultValue: "bronze"
            }
        },
        {
            freezeTableName: true,
            timestamps: false
        }
    );
    return schm_cust;
};