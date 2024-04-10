const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const { type } = require('os');

const app = express();
const port = process.env.POST || 3000

// db connection starts
mongoose.connect(process.env.DB_URL).then((connection) => {
    console.log("DB Connected");
}).catch((error) => {
    console.log("error is connecting DB");
    console.log(error);
})
// db connection ends

const UserSchema = mongoose.Schema({
    'name': {
        type:String,
        required: true
    },
    'email':{
        type: String,
        required: true,
        unique: true
    },
    'password':{
        type: String,
        required: true,
        minlength: 8
    },
    'confirmPassword':{
        type: String,
        required: true,
        minlength: 8,
        validate: {
            validator: function(){
                return this.password === this.confirmPassword
            },
            message: 'Password and confirmPassword must match'
        }
    },
});

const UserModal = mongoose.model('ScalerUsers', UserSchema);

async function getUsers(req, res){
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

async function getUserById(req, res){
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

async function createUser(req, res){
    console.log("new user");
    try {
        let userData = req.body;
        let user = await UserModal.create(userData);
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

app.use(express.json());

app.use((req, res, next) => {
    console.log("common path");
    try {
        if(req.method === 'POST'){
            if(Object.keys(req.body).length === 0){
                res.status(400).send({
                    'status': 'error',
                    'message': 'No data provided'
                });
                return;
            }
        }
        next();        
    } catch (error) {
        console.log("error occured");
        res.status(500).
        send({
            'status': 'error', 
            'message': error
        });
    }
})

app.get('/api/users', getUsers);

app.get('/api/users/:id', getUserById);

app.post('/api/users', createUser);

app.use((req, res) => {
    res.status(404).send({
        'status': 'error',
        'message': 'unknown call'
    })
})

// server connection starts
app.listen(port, ()=>{
    console.log(`server listening to ${port}`);
});
// server connection ends