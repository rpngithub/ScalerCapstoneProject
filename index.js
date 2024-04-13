const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/UserRoutes');
const productRouter = require('./routes/ProductRouter');


const app = express();
const port = process.env.PORT || 3000

app.use(express.json());
app.use(cookieParser())
/** 
 * User Routes
 */
app.use('/api/users', userRouter);

/** 
 * Product Routes
 */
app.use('/api/products',productRouter);

app.use((err, req, res)=>{
    console.log("coming in error route handler")
})

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