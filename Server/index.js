const Koa = require('koa');
const Logger = require('koa-logger');
const bodyParser = require('koa-body');
const routes = require('./routing');
const db = require('./database');
const cors = require('@koa/cors');

const port = 3001;

const app = new Koa();
// Logging
app.use(Logger());

app.use(cors());

// Set up body parsing middleware
app.use(bodyParser({ multipart: true }));

// Add routes and response to the requests
app.use(routes.routes()).use(routes.allowedMethods());

// function to start server.  Connect to database and listen to port
async function start() {
    try {
        await db.start();
        console.log('Database Connected');

        this.server = app.listen(port);
        console.log('Server running on port: %s.  Visit http://localhost:%s/', port, port);
    } catch (error) {
        console.log(error);
    }
}

app.close = async function () {
    this.server.close();
    db.close();
};

// Invoke the start function
start();
