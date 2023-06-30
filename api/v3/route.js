var express = require('express');
var router = express.Router();
const {login, DeleteAcc, getAllModels, createModels, updateModel, getOneModel, deleteModel, getComments, postAddComments, getMyComments}=require('../../controllers/controllers')


let users = {}

router.get('/', function(req,res){
    res.send('Hello!');
})
router.get('/stats', function(req,res){
    const name = req.headers['user-agent']
    let firstHtml =
        '<table>' +
        '<tr>' +
        '<td>Name</td>' +
        '<td>Count request</td>' +
        '</tr>'
    let secondHtml = ''

    if (users[name]) {

        users[name] += 1
    }else{
        users[name] = 1
    }
    for (const key in users) {
        secondHtml +=
            `<tr>
                <td>${key}</td>
                <td>${users[key]}</td>
            </tr>`
    }
    let resHtml = firstHtml + secondHtml + '</table>'
    res.send(resHtml);
    
})
router.get('/comments', getComments )
router.get('/comments/:id', getMyComments)
router.post('/comments',postAddComments)

router.get('/models', getAllModels)
router.get('/models/:id', getOneModel)
router.post('/models', createModels)
router.post('/login', login)
router.put('/models/:id', updateModel)
router.delete('/account/delete/:id', DeleteAcc)
router.delete('/models/:id', deleteModel)

module.exports = router;