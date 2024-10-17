import mongoose, { trusted } from "mongoose";

const customerSchema =new mongoose.Schema({
    firstName: {
        type: String,
        require: true 
    },
    lastName: {
        type: String,
        require: true
    }
});

customerSchema.virtual('fullName').get(function () {
    return this.firstName + ' ' + this.lastName;
});

const customers = mongoose.model('Customer', customerSchema);

// const createCustomer =async () => {
//     const customer = customers.create({
//         firstName: "Vivek",
//         lastName: "Ranjan"
//     })
// }

// createCustomer();

export default customers;