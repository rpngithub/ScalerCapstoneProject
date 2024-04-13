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
const userModel = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const UserModal = require('../models/UserModel');

const SECRET_KEY = 'voHYWbxkd946HH';

userRouter.get('/', getAll);
userRouter.post('/', checkInput, createNew);
userRouter.post('/signin', checkInput, signIn);
userRouter.get('/me', authorize, me);
userRouter.get('/:id', getById);
userRouter.patch('/:id', checkInput, updateById);
userRouter.delete('/:id', deleteById);

async function signIn(req, res){
    try {
        let email = req.body.email || "";
        let password = req.body.password || "";
        if(email && password){
            let user = await userModel.findOne({email:email});
            console.log(user);
            if(user){
                if(password === user.password){
                    let jwtToken = jwt.sign({data: user._id}, SECRET_KEY);
                    console.log(jwtToken)
                    res.cookie('token', jwtToken, {maxAge: 1000*60, httpOnly: true});
                    res.json({
                        status: 'success',
                        message: "signin successfully"
                    })
                }else{
                    res.status(400).send({
                        status: 'error',
                        message: "Invalid Credentials"
                    });
                }
            }else{
                res.status(404).send({
                    status: 'error',
                    message: "User not found"
                });
            }
        }else{
            res.status(400).send({
                status: 'error',
                message: "Username Password missing"
            });
        }
    } catch (error) {

        res.status(500).send({
            status: 'error',
            message: error
        })
    }
}

async function authorize(req, res, next){
    console.log("coming in authorize")
    let cookies = req.cookies;
    let userToken = cookies.token;
    if(userToken){
        let userIdObj = jwt.verify(userToken, SECRET_KEY);
        let userId = userIdObj.data;
        let user = await UserModal.findById(userId)
        if(user){
            req.user = user;
            next();
        }else{
            res.status(404).send({
                status: 'error',
                message: 'User not found'
            });
        }
    }else{
        res.status(403).send({
            status: 'error',
            message: 'Please sign in to check your details'
        });
    }
}

function me(req, res){
    console.log("coming in current user data")
    try {
        res.json({
            user: req.user
        })        
    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: error
        })
    }
}

module.exports = userRouter;