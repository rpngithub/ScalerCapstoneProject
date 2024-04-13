const express = require('express');
const ProductModel = require('../models/ProductModel')
const productRouter = express.Router();
const {
    getAll,
    getById,
    createNew,
    updateById,
    deleteById
} = require('../controllers/ProductController');
const {checkInput} = require('../utils/CrudFactory');

productRouter.get('/', getAll);
productRouter.post('/', checkInput, createNew);
productRouter.get('/search', searchProducts);
productRouter.get('/:id', getById);
productRouter.patch('/:id', checkInput, updateById);
productRouter.delete('/:id', deleteById);

async function searchProducts(req, res){
    console.log(req.query);
    try {
        let sortQuery = req.query.sort;
        let selectQuery = req.query.select;
        console.log("sort query", sortQuery);
        console.log("select query", selectQuery);
        let productPromise = ProductModel.find();
        if(sortQuery){
            let [sort,order] = sortQuery.split(" ");
            console.log(sort, order);
            if(order == 'asc'){
                productPromise.sort(sort)
            }else{
                productPromise.sort(`-${sort}`);
            }
        }
        if(selectQuery){
            productPromise.select(selectQuery);
        }
        let result = await productPromise;
        res.json({
            'status': 'success',
            data: result
        })        
    } catch (error) {
        console.log("error occured ", error);
        res.status(500).send({
            status: 'error',
            message: error
        }) 
    }
}

module.exports = productRouter;
