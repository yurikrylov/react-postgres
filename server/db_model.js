const Pool = require('pg').Pool
require('dotenv').config();
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: 5432,
});

const getData = () => {
    return new Promise(function(resolve, reject) {
        pool.query('SELECT * FROM merchants ORDER BY id ASC', (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results.rows);
        })
    })
}
const createData = (body) => {
    return new Promise(function(resolve, reject) {
        const { name, email } = body
        pool.query('INSERT INTO merchants (name, email) VALUES ($1, $2) RETURNING *', [name, email], (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(`A new value has been added: ${results.rows[0]}`)
        })
    })
};
const deleteData = (id) => {
    return new Promise(function(resolve, reject) {
        pool.query('DELETE FROM merchants WHERE id = $1', [id], (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(`Value deleted with ID: ${id}`)
        })
    })
}

module.exports = {
    getData,
    createData,
    deleteData,
}