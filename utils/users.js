const fs = require( 'fs' );
const path = require( 'path' );
const notify = require( './notifying' );

const dataPath = "./data.json"

const addUser = ( user ) => {
    if ( !validateUser( user ) ) throw new TypeError( "user must be a valid user" )

    const file = require( path.resolve( "", dataPath ) );

    const users = file.users;

    fs.writeFile( path.resolve( "", dataPath ), JSON.stringify( { ...file, users: [ ...users, user ] } ), () => {
        console.log( "User created: ", user );
    } );
}

const hasUser = ( id ) => {
    const users = getUsers();

    return users.some( user => user.id === id );
}

const getUsers = () => {
    const object = require( path.resolve( "", dataPath ) );

    return object.users;
}

const validateUser = ( user ) => {
    if ( user.toString() !== "[object Object]" ) return false;

    return (
        "id" in user && typeof user.id === "number" &&
        "first_name" in user && typeof user.first_name === "string" &&
        "last_name" in user && typeof user.last_name === "string"
    )
}

module.exports = {
    addUser,
    hasUser,
    getUsers,
    validateUser
}