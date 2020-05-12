const { Telegraf } = require( "telegraf" );
const CheckUpdates = require( "./utils/notifying.js" );
const { hasUser, addUser } = require( "./utils/users.js" );

const bot = new Telegraf( process.env.TOKEN );

bot.command( "start", ( ctx ) => {
    const { update: { message: { from: user } } } = ctx;

    if ( !hasUser( user.id ) ) {
        addUser( user );
    }
} )

setInterval( CheckUpdates, 1000 * 60 );

bot.startPolling( 3000 );


