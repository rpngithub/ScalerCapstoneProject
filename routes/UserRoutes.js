const express = require('express');
const userRouter = express.Router();
const {
    getAll,
    getById,
    createNew,
    updateById,
    deleteById,
} = require('../controllers/UserController');
const {checkInput} = require('../utils/CrudFactory');

userRouter.get('/', getAll);
userRouter.get('/:id', getById);
userRouter.post('/', checkInput, createNew);
userRouter.patch('/:id', checkInput, updateById);
userRouter.delete('/:id', deleteById);

module.exports = userRouter;