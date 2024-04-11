const UserModal = require('../models/UserModel');

const isEmpty = (req, res, next) => {
    console.log("coming to isEmpty");
    console.log(req.body)
    let empty = Object.keys(req.body).length === 0;
    console.log(empty)
    if (empty) {
        res.status(400).send({
            'status': 'error',
            'message': 'No data provided'
        })
    } else {
        next();
    }
}

async function getAll(req, res){
    console.log("get users");
    try {
        let allUsers = await UserModal.find();
        if(allUsers.length == 0){
            res.json({
                'status': 'error',
                'message': 'no users found'
            });
        }else{
            res.json({
                'status': 'success',
                'users': allUsers
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
    console.log("get user by id");
    try {
        const {id} = req.params;
        let user = null;
        try {
            user = await UserModal.findById(id);
        } catch (error) {
            console.log(error);
        }
        if(user){
            res.json({
                'status': 'success',
                'user': user
            });
        }else{
            res.status(404).json({
                'status': 'error',
                'message': 'User not found'
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
    console.log("new user");
    try {
        let dataToCreate = req.body;
        let user = await UserModal.create(dataToCreate);
        res.status(201).json({
            'status': 'success',
            'message': 'user created successfully'
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
    console.log("update user");
    try {
        const {id} = req.params;
        let dataToUpdate = req.body;
        let user = await UserModal.findByIdAndUpdate(id, dataToUpdate, {new:true})
        res.status(200).json({
            'status': 'success',
            'message': 'user updated successfully',
            'data': user
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
    console.log("delete user");
    try {
        const {id} = req.params;
        let dataToUpdate = req.body;
        let user = await UserModal.findByIdAndDelete(id)
        res.json({
            'status': 'success',
            'message': 'user deleted successfully',
            'data': user
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