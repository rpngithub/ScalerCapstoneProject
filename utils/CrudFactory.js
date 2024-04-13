
const getAllFactory = (model) => async (req, res) => {
    console.log("get All");
    try {
        let allData = await model.find();
        if(allData.length == 0){
            res.json({
                'status': 'error',
                'message': 'no data found'
            });
        }else{
            res.json({
                'status': 'success',
                'users': allData
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

const getElementByIdFactory = (model) => async (req, res) => {
    console.log("get by Id");
    try {
        const {id} = req.params;
        let data = null;
        // try {
            data = await model.findById(id);
        // } catch (error) {
        //     console.log(error);
        // }
        if(data){
            res.json({
                'status': 'success',
                'user': data
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

const createFactory = (model) => async (req, res) => {
    console.log("new record");
    try {
        let dataToCreate = req.body;
        let createdRecord = await model.create(dataToCreate);
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

const updateElementByIdFactory = (model) => async (req, res) => {
    console.log("update by id");
    try {
        const {id} = req.params;
        let dataToUpdate = req.body;
        // try {
            let updatedRecord = await model.findByIdAndUpdate(id, dataToUpdate, {new:true})
            res.status(200).json({
                'status': 'success',
                'message': 'user updated successfully',
                'data': updatedRecord
            })
        // } catch (error) {
        //     console.log("error in update", error);
        //     res.status(500).send({
        //         'status': 'error', 
        //         'message': error
        //     });
        // }
        
    } catch (error) {
        console.log("error occured");
        res.status(500).
        send({
            'status': 'error', 
            'message': error
        });
    }
}

const deleteElementByIdFactory = (model) => async (req, res) => {
    console.log("delete by id");
    try {
        const {id} = req.params;
        let deletedRecord = await model.findByIdAndDelete(id)
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

const checkInput = (req, res, next) => {
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

module.exports = {
    getAllFactory,
    getElementByIdFactory,
    createFactory,
    updateElementByIdFactory,
    deleteElementByIdFactory,
    checkInput,
}