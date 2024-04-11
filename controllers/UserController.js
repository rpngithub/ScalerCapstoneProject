const UserModal = require('../models/UserModel');
const {
    getAllFactory,
    getElementByIdFactory,
    createFactory,
    updateElementByIdFactory,
    deleteElementByIdFactory,
} = require('../utils/CrudFactory');

const getAll = getAllFactory(UserModal);
const getById = getElementByIdFactory(UserModal);
const createNew = createFactory(UserModal);
const updateById = updateElementByIdFactory(UserModal);
const deleteById = deleteElementByIdFactory(UserModal);

module.exports = {
    getAll,
    getById,
    createNew,
    updateById,
    deleteById
}