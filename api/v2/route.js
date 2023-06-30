var express = require('express');
const { Validation } = require('../v1/middleware');
var router = express.Router();
const {getComments, postAddComments, getMyComments}=require('../../controllers/controllers')


let comments = [];
let users = {}

router.get('/', function(req,res){
    res.send('Hello!');
})
router.get('/stats', function(req,res){
    let data = req.body
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



module.exports = router;