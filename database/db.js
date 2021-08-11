const Config = require('./config.json')
const path = require('path');
const DB_PATH = path.join(__dirname, Config.storage);
const Database = require('better-sqlite3');

const NOT_INITIALIZED = "NOT_INITIALIZED"
const INITIALIZATION = `CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT)`

let connection = NOT_INITIALIZED

async function connect() {
    if (connection === NOT_INITIALIZED) {
        connection = new Database(DB_PATH, {verbose: console.log})
        await initializeDatabase()
    }
    return connection
}

async function initializeDatabase() {
    await connection.exec(INITIALIZATION);
}

module.exports = {
    connect
}
