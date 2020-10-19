const Router = require('koa-router');
const bcrypt = require('bcrypt');
const database = require('../database');
const urlService = require('../urlService');

const router = new Router();
const saltRounds = 10;

/* to simplify code, can attach multiple gets and posts together
router
    .get
    .post
*/

// Response to GET requests
router
    .get('/', async (ctx) => {
        ctx.body = 'Hello World!';
    })
    // Get original url from db
    .get('/t/:miniURL', async (ctx) => {
        const url = await urlService.findURL(ctx, ctx.params.miniURL);
        ctx.redirect(url);
    })
    // enter new URL into DB
    .post('/minify', async (ctx) => {
        const miniURL = await urlService.urlMinify(ctx, ctx.request.body.url);
        // console.log(miniURL);
        return miniURL;
    })
// testing crypting passwords
    .get('/crypt', async (ctx) => {
        const salt = bcrypt.genSaltSync(saltRounds);
        console.log(salt);
        const plainPass = 'test';
        const plainPass2 = 'test2';
        const hash = bcrypt.hashSync(plainPass, salt);

        const genHash = '$2b$10$ZdwNHV3nyTZMUzsLiPvWUOFLzZAp21sa/3abN3L/2tekEPkV6AeJ6';

        ctx.body = 'hash: ' + hash + ' matches pass?: ' + bcrypt.compareSync(plainPass, genHash) + ' and not correct: ' + bcrypt.compareSync(plainPass2, genHash);
    })
    .get('/test', async (ctx) => {
        ctx.body = await database.query('SELECT 1 + 1 AS result')
            .then(c => c.rows[0].result);
    });

module.exports = router;
