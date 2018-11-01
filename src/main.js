var express = require('express')
var app = express()
const logger = require('morgan');
const db = require('./models');
var bodyParser = require('body-parser')

import account_get from './api/account_get'
import session_login from './api/session_login'

// do something with connectionOptions,
// for example append a custom naming strategy or a custom logger

db.sequelize.authenticate().then(() => {
    let env={db: db,
             logger: console,
             models: db}
    app.use(logger('dev'));
    app.use(bodyParser.json());

    app.get('/api/users/:id', function (req, res) {
        account_get(env,req,res)
    })
    app.post('/api/session', function (req, res) {
        session_login(env,req,res)
    })

    app.all('*', function(req,res){
        res.status(404).send(
            {
                status: "error",
                errors: {
                    base: "NO_ENDPOINT"
                }
            }
        )
    })
    app.listen(3000);
})
