const mysql = require('mysql2')
const dbPref = require('../config/db_pref')
const connection = mysql.createConnection(dbPref)

module.exports = connection