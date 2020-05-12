const fs = require( 'fs' );
const path = require( 'path' );

const dataPath = "./data.json"

module.exports = {
    addUser: ( user ) => {
        if ( !this.validateUser( user ) ) throw new TypeError( "user must be a valid user" )

        const file = JSON.parse( fs.readFileSync( path.resolve( "", dataPath ) ).toString() );

        const users = file.users;
        users.push( user );

        fs.writeFileSync( path.resolve( "", dataPath ), JSON.stringify( { ...file, users } ) );
    },
    hasUser: ( id ) => {
        const users = this.getUsers();

        return users.some( user => user.id === id );
    },
    getUsers: () => {
        const file = fs.readFileSync( path.resolve( "", dataPath ) ).toString();
        const object = JSON.parse( file );

        return object.users;
    },
    validateUser: ( user ) => {
        if ( user.toString() !== "[object Object]" ) return false;

        return (
            "id" in user && typeof user.id === "number" &&
            "first_name" in user && typeof user.first_name === "string" &&
            "last_name" in user && typeof user.last_name === "string"
        )
    },
}