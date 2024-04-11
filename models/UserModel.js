const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    'name': {
        type:String,
        required: true
    },
    'email':{
        type: String,
        required: true,
        unique: [true, "Email already exists"]
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

module.exports = UserModal;