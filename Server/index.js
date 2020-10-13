const Koa = require('koa');
const Logger = require('koa-logger');
const bcrypt = require('bcrypt');

const routes = require('./routing');
const db = require('./database');

const port = 3001;

const app = new Koa();

// Logging
app.use(Logger());

// Add routes and response to the requests
app.use(routes.routes()).use(routes.allowedMethods());

app.use(async (ctx,next) => {
    //db.start();
    //console.log('Database Connected');
});

// Listen to port
app.listen(port, () => {
    
    db.start();
    console.log('Database Connected');
 
    console.log('Server running on port: %s.  Visit http://localhost:%s/', port, port);
});


/* Listen to port
app.listen(port, () => {
    await db.start();
    console.log('Database Connected');
 
    console.log('Server running on port: %s.  Visit http://localhost:%s/', port, port);




    app.start = async function () {
    try {
        await db.start();
        console.log('Database Connected');

        this.server = await app.listen(port);
        console.log('Server running on port: %s.  Visit http://localhost:%s/', port, port);

    } catch (error) {
        console.log(error);
    }
}

app.close = async function () {
    this.server.close();
    db.close();
}
});


export default app;
*/
