const ProductModal = require('../models/ProductModel');

async function getAll(req, res){
    console.log("get products");
    try {
        let allProducts = await ProductModal.find();
        if(allProducts.length == 0){
            res.json({
                'status': 'error',
                'message': 'no products found'
            });
        }else{
            res.json({
                'status': 'success',
                'products': allProducts
            });
        }

    } catch (error) {
        console.log("error occured");
        res.status(500).
        send({
            'status': 'error', 
            'message': error
        });
    }
}

async function getById(req, res){
    console.log("get product by id");
    try {
        const {id} = req.params;
        let product = null;
        try {
            product = await ProductModal.findById(id);
        } catch (error) {
            console.log(error);
        }
        if(product){
            res.json({
                'status': 'success',
                'product': product
            });
        }else{
            res.status(404).json({
                'status': 'error',
                'message': 'Product not found'
            });
        }
        
    } catch (error) {
        console.log("error occured");
        res.status(500).
        send({
            'status': 'error', 
            'message': error
        });
    }
}

async function createNew(req, res){
    console.log("new product");
    try {
        let dataToCreate = req.body;
        let product = await ProductModal.create(dataToCreate);
        res.status(201).json({
            'status': 'success',
            'message': 'product created successfully'
        })
        
    } catch (error) {
        console.log("error occured");
        res.status(500).
        send({
            'status': 'error', 
            'message': error
        });
    }
}

async function updateById(req, res){
    console.log("update product");
    try {
        const {id} = req.params;
        let dataToUpdate = req.body;
        let product = await ProductModal.findByIdAndUpdate(id, dataToUpdate, {new:true})
        res.status(200).json({
            'status': 'success',
            'message': 'product updated successfully',
            'data': product
        })
        
    } catch (error) {
        console.log("error occured");
        res.status(500).
        send({
            'status': 'error', 
            'message': error
        });
    }
}

async function deleteById(req, res){
    console.log("delete product");
    try {
        const {id} = req.params;
        let dataToUpdate = req.body;
        let product = await ProductModal.findByIdAndDelete(id)
        res.json({
            'status': 'success',
            'message': 'product deleted successfully',
            'data': product
        })
        
    } catch (error) {
        console.log("error occured");
        res.status(500).
        send({
            'status': 'error', 
            'message': error
        });
    }
}

module.exports = {
    getAll,
    getById,
    createNew,
    updateById,
    deleteById,
    isEmpty
}