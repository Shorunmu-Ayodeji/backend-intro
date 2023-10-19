//get acces to databasse 
const Customers = require('../models/customer')

const getAllCustomers = (req,res) =>{
   res.status(200).json({Customers, numOfCustomers: Customers.lenght})
};

const getACustomer = (req,res) =>{
    const {customerId} = req.params;
    const customer = Customers.find((c) => c.id === parseInt(customerId));
    if(!customer) {
        return res.status(404).json({
            success: false,
            message: `Customer with the id : ${customerId} not found`
        });
    }
    res.status(200).json({success: true, customer});
};

const createACustomer = (req,res) =>{
    const {name} =req.body
    if(!name) {
        return res.status(400).json({success: false, msg:'please provide a name'})
    }
    const newCustomer ={
        id: 6,
        name,
    };
    res
    .status(201)
    .json({sucess: false, customers: [...Customers, newCustomer] })
};

const updateCustomer = (req,res) =>{
   const {customerId} = req.params
   const {name} = req.body
   if (!name) {
    return res.status(400).json({msg:"provide a name"})
   }
   const updatedCustomers = Customers.filter ((c) => {
    if (c.id ===parseInt(customerId)){
        c.name=name
    }
    return c;
   });
   res.status(200).json({customers: updatedCustomers})
};

const deleteCustomer = (req,res) =>{
    const {customerId} = req.params
    const customer = Customers.find((c) => c.id === parseInt(customerId));
    if(!customer) {
        return res.status(404).json({
            success: false,
            message: `Customer with the id : ${customerId} not found`
        });
    }
    const remainingCustomers = Customers.filter(
        (c) => c.id  !==parseInt(customerId)
    );

    res.status(200).json({customers: remainingCustomers});
};

module.exports = {
    getAllCustomers,
    getACustomer,
    createACustomer,
    updateCustomer,
    deleteCustomer
}