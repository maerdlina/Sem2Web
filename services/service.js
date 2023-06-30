const {ObjectId}=require('mongodb')
const {start,getDB}=require('../config/connDB')


let db;

start((err) => {
    if (!err) {
        db=getDB();
    }
    else {
        console.log(`DB connection error: ${err}`)
    }
})



async function addComments(db, data){
    const comments = db.collection("comments")
    await comments.insertOne(data)
}

async function Create(collections, data){
    try {
        data.time_create=new Date()
        data.last_update = new Date()
        const crt= db.collection(collections)
        await crt.insertOne(data)
    }
    catch(err){
        return err
    }
}

async function Update(id, data){
    data.last_update = new Date()
    const models = db.collection("models")
    return await models.updateOne({_id: new ObjectId(id)}, { $set: data})
}


async function Delete(collections, id){
    try{
        const model = await db.collection(collections)
        console.log(model);
        if (model){
            return await model.deleteOne({_id: new ObjectId(id)})
        }
        else {
            return null;
        }
    }
    catch (err) {
        return err
    }
}

async function getAll(collections){
    try{
        const all  = db.collection(collections)
        let result
        if(collections==="models") {
            result = await all.find({}, {projection: {name_model: 1}})
        }else {result = await all.find()}
        return  result.toArray()
    }catch(err) {
        return err
    }
}

async function findOneAny(collections, id){
    try {
        return await db.collection(collections).findOne({_id: new ObjectId(id)})
    }
    catch(err){
        return err
    }
}

async function getApiKeys() {
    const keys = []
    let objectKeys = await getAll('users')
    objectKeys.forEach(element => keys.push(element.api_key))
    if (keys){
        return keys
    }else{
        return null
    }
}

module.exports={
    addComments,
    getAll,
    findOneAny,
    Create,
    Update,
    Delete,
    getApiKeys
}