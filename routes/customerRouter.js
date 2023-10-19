const express = require('express')
const router = express.Router()

const {
    getAllCustomers,
    getACustomer,
    createACustomer,
    updateCustomer,
    deleteCustomer
} = require ('../controllers/customerController')

router.route('/' ).get(getAllCustomers).post(createACustomer)
router.route('/:customerId').get(getACustomer).delete(deleteCustomer).patch(updateCustomer)

module.exports = router;