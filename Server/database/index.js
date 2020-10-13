const { Pool } = require('pg');
const config = require('../configuration');

exports.start = async function () {
    const host = config.get('host');
    const user = config.get('user');
    const password = config.get('password');
    const database = config.get('database');
    const port = config.get('port');

    this.pool = new Pool({ host, user, password, database, port })
}

exports.close = async function () {
    return this.pool.end();
}

exports.query = async function (q, data) {
     return await this.pool.query(q, data);
}


  /*  Database tables for URLs and users

CREATE TABLE urls(
   id BIGSERIAL PRIMARY KEY,
   original_url VARCHAR NOT NULL,
   mini_url VARCHAR NOT NULL,
   counter INT NOT NULL,
   last_hit TIMESTAMP
   user_id INT
);

CREATE TABLE users (
	user_id serial PRIMARY KEY,
	username VARCHAR ( 50 ) UNIQUE NOT NULL,
	password VARCHAR ( 50 ) NOT NULL,
	email VARCHAR ( 255 ) UNIQUE NOT NULL,
	created_on TIMESTAMP NOT NULL,
        last_login TIMESTAMP 
);

*/