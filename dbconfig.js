const mysql = require('mysql')

const db = mysql.createConnection({
    host: 'bi30tloqqg6aqnsjzk5h-mysql.services.clever-cloud.com',
    user: 'uapdthevueb7t3hg',
    password: 'zEZ6Q84UgLSHREfJwowg',
    database: 'bi30tloqqg6aqnsjzk5h'
});

module.exports = db;