var express = require('express')
var app = express()
const logger = require('morgan');
var typeorm = require("typeorm");
var EntitySchema = typeorm.EntitySchema;
import account_get from './api/account_get'


typeorm.getConnectionOptions().then((connectionOptions) => {

// do something with connectionOptions,
// for example append a custom naming strategy or a custom logger
    Object.assign(connectionOptions, {
        entities: [new EntitySchema(require("./entity/User"))]});

typeorm.createConnection(connectionOptions)
    .then(function (connection) {
    var env={db: connection}
    app.use(logger('dev'));
    app.get('/api/account/:id', function (req, res) {
        account_get(env,req,res)
    })
    app.listen(3000);
}).catch(error => console.log("TypeORM connection error: ", error));
})
