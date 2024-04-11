const express = require('express');
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
productRouter.get('/:id', getById);
productRouter.post('/', checkInput, createNew);
productRouter.patch('/:id', checkInput, updateById);
productRouter.delete('/:id', deleteById);

module.exports = productRouter;
