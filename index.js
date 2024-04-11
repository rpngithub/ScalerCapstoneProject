const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const {
    getAll,
    getById,
    createNew,
    updateById,
    deleteById,
    isEmpty
} = require('./controllers/UserController');


const app = express();
const port = process.env.PORT || 3000

app.use(express.json());

/** 
 * User Routes
 */
app.get('/api/users', getAll);
app.get('/api/users/:id', getById);
app.post('/api/users', isEmpty, createNew);
app.patch('/api/users/:id', isEmpty, updateById);
app.delete('/api/users/:id', deleteById);


app.use((req, res) => {
    res.status(404).send({
        'status': 'error',
        'message': 'unknown call'
    })
})


// db connection starts
mongoose.connect(process.env.DB_URL).then((connection) => {
    console.log("DB Connected");
}).catch((error) => {
    console.log("error is connecting DB");
    console.log(error);
})
// db connection ends

// server connection starts
app.listen(port, ()=>{
    console.log(`server listening to ${port}`);
});
// server connection ends