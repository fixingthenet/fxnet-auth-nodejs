//middleware
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();
//const { applyMiddleware } = require('graphql-middleware');
import server from './server';
import models from './models';

async function start() {
    // Make sure the database tables are up to date
    //    await models.sequelize.authenticate();
    var options = {
        port: 3000,
    }
    // Start the GraphQL server
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(cors());
    server.applyMiddleware({ app });
    app.listen(options,() => {
        console.log(`Server is running on localhost`);
    })
    await models.User.setup();
}

start();
console.log(server)
