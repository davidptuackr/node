const mongoose = require('mongoose');

mongoose.connect(
    "mongodb://127.0.0.1:27017/roadbook", {
        useNewUrlParser: true
    }
).then(() => {
    console.log("connected to MongoDB");
}).catch((err) => {
    console.log(err);
});

const customerSchema = mongoose.Schema({
    name: 'string',
    age: 'number',
    sex: 'string'
}, {
    collection: 'newCustomer'
}
);

const Customer = mongoose.model('Schema', customerSchema);

const customer1 = new Customer({name: 'david', age: 30, sex: 'male'});

customer1.save().then(() => {
    console.log(customer1);
}).catch((err) => {
    console.log(err);
})