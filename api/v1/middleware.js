const morgan=require('morgan');
const helmet=require('helmet');
const {getApiKeys}=require('../../services/service')

const Helmet=helmet();
const Morgan=morgan('tiny');


function Validation(req, res, next) {
    const userInput = req.body;
    const regex = /[@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g;
    let af = regex.test(userInput)
    if (af) {
        return res.send(400,'Неправильный формат ввода');
    }
    next();
}

async function Autorization(req,res,next) {
    const keys = await getApiKeys()
    let api=Number(req.headers["api_key"]);
    console.log(api);
    if (keys) {
        if (!keys.includes(api) && req.method !== "GET" && req.url !== "/login") {
            return res.status(403).send('access denied')
        }else{
            next()
        }
    }else{
        res.send('not apikey in databases')
    }
}

function errorsValidations(err, req, res) {
    res.status(err.status).send(err.message)
}

function BadRequest(req,res) {
    res.send(400,'Неправильный запрос');
}

module.exports = {
    BadRequest,
    Autorization,
    Validation,
    Helmet,
    Morgan,
    errorsValidations
}