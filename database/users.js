const db = require('./db')
const INSERT_USERS = 'INSERT INTO users(id, username) VALUES(?, ?)'
const GET_ALL_USERS = 'SELECT * FROM users'
const GET_USER_BY_ID = 'SELECT * FROM users WHERE id=?'
const GET_USER_BY_USERNAME = 'SELECT * FROM users WHERE username=?'

let connection = null

async function getConnection() {
    if (!connection) {
        connection = await db.connect()
    }
}

async function insertUser(data) {
    let response
    try {
        await getConnection()
        const query = connection.prepare(INSERT_USERS)
        response = query.run(data.id, data.username)
    } catch (e) {
        console.trace(e)
        response = {'Status': 'Error'}
    }
    return response
}

async function getAllUsers() {
    let response
    try {
        await getConnection()
        const query = connection.prepare(GET_ALL_USERS)
        return query.all()
    } catch (e) {
        console.trace(e)
        response = {'Status': 'Error'}
    }
    return response
}

async function getUserById(id) {
    let response
    try {
        await getConnection()
        const query = connection.prepare(GET_USER_BY_ID)
        return query.get(id)
    } catch (e) {
        console.trace(e)
        response = {'Status': 'Error'}
    }
    return response
}

async function getUserByUsername(username) {
    let response
    try {
        await getConnection()
        const query = connection.prepare(GET_USER_BY_USERNAME)
        return query.get(username)
    } catch (e) {
        console.trace(e)
        response = {'Status': 'Error'}
    }
    return response
}

module.exports = {
    insertUser,
    getAllUsers,
    getUserById,
    getUserByUsername
}
