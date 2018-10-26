var express = require('express')
var app = express()
const logger = require('morgan');
var typeorm = require("typeorm");
var EntitySchema = typeorm.EntitySchema;
import account_get from './api/account_get'

typeorm.createConnection({
    type: "postgres",
    host: "172.17.0.1",
    port: 5432,
    username: "postgres",
    password: "test",
    database: "fxnet-auth",
    "migrations": ["db/migrations/*.js"],
    "cli": {
        "migrationsDir": "db/migrations"
    },
    logging: true,
    entities: [
        new EntitySchema(require("./entity/User")),

    ]
}).then(function (connection) {
    var env={db: connection}
    app.use(logger('dev'));
    app.get('/api/account/:id', function (req, res) {
        account_get(env,req,res)
    })
    app.listen(3000);
}).catch(error => console.log("TypeORM connection error: ", error));
