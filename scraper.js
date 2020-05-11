import Telegram from "telegraf"
import CheckUpdates from "./utils/notifying.js";
import { hasUser, addUser } from "./utils/users.js";


const TOKEN = "1140565061: AAGBmLhcbMAh5GpCFv1phmSdZyqNcgTAfO8";

const bot = new Telegram.Telegraf( TOKEN );

bot.command( "start", ( ctx ) => {
    const { update: { message: { from: user } } } = ctx;

    if ( !hasUser( user.id ) ) {
        addUser( user );
    }
} )

setInterval( CheckUpdates, 86400000 );

bot.startPolling( () => console.log( "Connected" ) );


