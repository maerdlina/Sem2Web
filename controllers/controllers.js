const {ObjectId}=require('mongodb')
const {getAll, Create, findOneAny, Delete, Update}=require('../services/service')

let error = new Error('Error!')

async function login(req,res,next){
    try{
        const data=req.body
        if (data.name){
            const number=Math.floor(Math.random() * 1000)
            const result={
                "name":data.name,
                "api_key":number
            }
            await Create("users", result)
            res.send(`Succsessful registration, your api-key:${number}`)
        }
        else{
            res.send(400,'error')
        }
    }
    catch (err){
        next(error)
    }
}

async function DeleteAcc(req,res,next) {
    try {
        const id = req.params.id
        if (ObjectId.isValid(id)){
            await Delete("users",id)
            res.send('Account deleted')
        }
        else{
            res.send(400,'error delete')
        }
    }
    catch (err){
        next(error)
    }
}

async function getAllModels(req,res,next){
    try {
        res.send(await getAll("models"))
    }
    catch (err){
        next(error)
    }
}

async function getOneModel(req,res,next){
    try {
        const id = req.params.id

        if(ObjectId.isValid(id)){
            res.send(await findOneAny('models', req.params.id))
        }else{
            res.status(400).send("no valid id")
        }
    }catch (err) {
        next(error)
    }
}

async function createModels(req, res, next) {
    try {
        const data = req.body;
        if (data.name && data.name_model && data.type && data.model && data.description && data.comments){
            await Create("models", data)
            res.send("creating models")
        }else{
            res.status(400).send("no valid data")
        }
    }catch (err) {
        next(error)
    }
}

async function updateModel(req, res, next){
    try {
        const data = req.body;
        if (ObjectId.isValid(req.params.id)) {
            if (data.name || data.name_model || data.type || data.model || data.description || data.comments) {
                await Update(req.params.id, data)
                res.status(200).send("model update")
            } else {
                res.status(400).send("Error: No data update")
            }
        }
    }catch (e){
        next(e)
    }
}

async function deleteModel(req, res, next) {
    try {
        const id = req.params.id
        if(ObjectId.isValid(id)){
            if (await Delete("models", req.params.id)){
                res.send("delete model")
            }else {
                res.status(400).send("no find model")
            }
        }else{
            res.status(400).send("no valid id")
        }
    }catch (err) {
        next(error)
    }
}


async function getComments(req, res, next){
    try {
        res.status(200).send(await getAll('comments'))
    }catch (err) {
        next(error)
    }
}

async function getMyComments(req, res){
    if (ObjectId.isValid(req.params.id)){
        const result = await findOneAny('comments',req.params.id)
        res.status(200).send(result)
    }else{
        res.status(400).send("id param is not valid")
    }
}

async function postAddComments(req, res,next){
    try {
        const data = req.body;

        if (data.name && data.text){
            await Create("comments", data)
            res.status(200).send("add comments")
        }else{
            res.status(400).send("Error: No data input")
        }
    }catch (err) {
        next(error)
    }
}

module.exports={
    getComments,
    getMyComments,
    postAddComments,
    getAllModels,
    login,
    DeleteAcc,
    getOneModel,
    createModels,
    updateModel,
    deleteModel
}