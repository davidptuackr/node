module.exports = (생성된_연결, dtypes) => {
    const 스키마 = 생성된_연결.define(
        "cust2",
        {
            custid: {
                type: dtypes.STRING(20),
                allowNull: false,
                primaryKey: true
            },
            age: {
                type: dtypes.INTEGER,
                allowNull: false,
            },
            membership: {
                type: dtypes.STRING(10),
                allowNull: false,
                defaultValue: "bronze"
            }
        },
        {
            freezeTableName: true,
            timestamps: false
        }
    );
    return 스키마;
};