var express = require('express')
var app = express()
const logger = require('morgan');
import account_get from './api/account_get'

const db = require('./models');


// do something with connectionOptions,
// for example append a custom naming strategy or a custom logger

db.sequelize.authenticate().then(() => {
    let env={db: db,
             logger: console,
             models: db}
    app.use(logger('dev'));
    app.get('/api/users/:id', function (req, res) {
        account_get(env,req,res)
    })
    app.listen(3000);
})
