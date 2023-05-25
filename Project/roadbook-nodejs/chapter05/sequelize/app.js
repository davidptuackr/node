const {sequelize} = require('./models/index.js');

const driver = () => {
    sequelize.sync().then(
        () => {console.log('INIT COMPLETE');}
    ).catch(
        (err) => {
            console.error('FAILED TO INIT');
            console.error(err);
        }
    );
};

driver();