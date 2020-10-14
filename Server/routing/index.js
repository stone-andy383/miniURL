const Router = require('koa-router');
const database = require('../database');
const bcrypt = require('bcrypt');

const router = new Router();
const saltRounds = 10;

// Functions

function intToBase36(x) {
    const result = x.toString(36);
    
    return result;
};

/* to simplify code, can attach multiple gets and posts together
router
    .get
    .post
*/

// Response to GET requests
router.get('/', async (ctx) => {

    ctx.body = 'Hello World!';
});

router.get('/t/:miniURL', async (ctx) => {
    // find url in DB or error- does not exist
    let id = parseInt(ctx.params.miniURL, 36);
    console.log(id);
    try {
        var query = await database.query(
            'SELECT * FROM public.urls WHERE id = ' + id
        )

        
        if (query.rows[0] != null) {
            await database.query(
                'UPDATE public.urls SET counter = counter + 1 WHERE id = ' + id
            )
            ctx.redirect(query.rows[0].original_url);
        } else {
            ctx.body = 'Error: Not a valid url';
        }
    } catch (error) {
        ctx.body = 'Error';
    }


    
});

router.post('/minify', async (ctx) => {
    // enter new URL into DB

    try {
        await database.query(
            `
            INSERT INTO public.urls(
            original_url, counter, user_id)
            VALUES ('` + ctx.request.body.url + `', 0, 0)
            `
        );
    } catch (error) {
        ctx.body = 'Error';
    }

});

router.get('/crypt', async (ctx) => {
    const salt = bcrypt.genSaltSync(saltRounds);
    
    const plainPass = 'test';
    const plainPass2 = 'test2';
    const hash = bcrypt.hashSync(plainPass, salt);

    genHash = '$2b$10$ZdwNHV3nyTZMUzsLiPvWUOFLzZAp21sa/3abN3L/2tekEPkV6AeJ6';
    
    

    ctx.body = 'hash: ' + hash + ' matches pass?: ' + bcrypt.compareSync(plainPass, genHash) + ' and not correct: ' + bcrypt.compareSync(plainPass2, genHash);
});

router.get('/test', async (ctx) => {
    ctx.body = await database.query('SELECT 1 + 1 AS result')
        .then(c => c.rows[0].result);
});

module.exports = router;


/* 
// Test to make sure it correctly coverts int to base36 and base36 to int
    let pass = 0;
    let fail = 0;

    for(let i = 0; i < 9999999; i++) {
        const num = i;
        const numBase36 = intToBase36(num);
        const numReverse = parseInt(numBase36, 36);
        if (numReverse === num) {
            pass++;
        } else {
            fail++;
        }
    }
    const num = 9999;
    const numBase36 = intToBase36(num);
    const numReverse = parseInt(numBase36, 36);
    ctx.body = 'Hello World! ' + 'Num:' + num + ' Base36:' + numBase36 + ' back again:' + numReverse + ' Pass: ' + pass + ' Fail: ' + fail;

*/