const database = require('../database');

// Functions
function intToBase36(x) {
    return x.toString(36);
}

exports.findURL = async function (ctx, miniURL) {
    const id = parseInt(miniURL, 36);
    console.log(id);
    try {
        // Grab minified ID from database
        const text = 'SELECT * FROM public.urls WHERE id = $1';
        const values = [id];
        const query = await database.query(text, values);

        // Throw error if query returns nothing
        if (query.rows[0] == null) {
            return ctx.throw(404);
        }

        // Update counter for page hit
        const text2 = 'UPDATE public.urls SET counter = counter + 1 WHERE id = $1';
        await database.query(text2, values);

        // Redirect page to requested URL
        return query.rows[0].original_url;
    } catch (error) {
        console.log(error);
        return ctx.throw(error.statusCode);
    }
};

exports.urlMinify = async function (ctx, url) {
    try {
        // Insert new URL into database
        const miniURL = url;
        const text = `INSERT INTO public.urls(original_url, counter, user_id) 
        VALUES ($1, $2, $3) RETURNING *`;
        const values = [miniURL, 0, 0];
        const query = await database.query(text, values);

        // Throw error if insert fails
        if (query.rows[0] === undefined) {
            return ctx.throw(500);
        }

        // Return minified value
        const idValue = parseInt(query.rows[0].id, 10);
        ctx.response.status = 200;
        return intToBase36(idValue);
    } catch (error) {
        console.log(error);
        ctx.throw(error.statusCode);
    }
};

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
