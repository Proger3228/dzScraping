const { Telegraf } = require( "telegraf" );
const CheckUpdates = require( "./utils/notifying.js" );
const { hasUser, addUser } = require( "./utils/users.js" );
const app = require( "express" )()
const fs = require( "fs" );
const path = require( "path" );

const bot = new Telegraf( process.env.TOKEN );

bot.command( "start", ( ctx ) => {
    const { update: { message: { from: user } } } = ctx;

    if ( !hasUser( user.id ) ) {
        addUser( user );
    }

    CheckUpdates( user.id, true );
} )

bot.startPolling( 3000 );

CheckUpdates();
setInterval( CheckUpdates, 1000 * 60 );

app.get( "/", ( req, res ) => res.send( require( path.resolve( "", "./data.json" ) ) ) );

app.listen( process.env.PORT || 3000 );

