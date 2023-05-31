const {sequelize} = require('./models/my_index.js');

const driver = async () => {
    try {
        await sequelize.sync();
        console.log("INIT COMPLEATE");
    } catch (err) {
        console.error("INIT FAILED");
        console.error(err);
    }
}

driver();