const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.DB_PORT || 3306,
    connectionLimit: 10,
});

pool.getConnection()
    .then(() => console.log('✅ Connected to MySQL on Railway'))
    .catch(err => console.error('❌ MySQL Connection Error:', err));

module.exports = pool;
