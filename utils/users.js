import fs from 'fs';
import path from 'path';

const dataPath = "./data.json"

export const addUser = ( user ) => {
    if ( !validateUser( user ) ) throw new TypeError( "user must be a valid user" )

    const file = JSON.parse( fs.readFileSync( path.resolve( "", dataPath ) ).toString() );

    const users = file.users;
    users.push( user );

    fs.writeFileSync( path.resolve( "", dataPath ), JSON.stringify( { ...file, users } ) );
}

export const hasUser = ( id ) => {
    const users = getUsers();

    return users.some( user => user.id === id );
}

export const getUsers = () => {
    const file = fs.readFileSync( path.resolve( "", dataPath ) ).toString();
    const object = JSON.parse( file );

    return object.users;
}
export const validateUser = ( user ) => {
    if ( user.toString() !== "[object Object]" ) return false;

    return (
        "id" in user && typeof user.id === "number" &&
        "first_name" in user && typeof user.first_name === "string" &&
        "last_name" in user && typeof user.last_name === "string"
    )
}