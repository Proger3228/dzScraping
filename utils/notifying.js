const { Telegram } = require( 'telegraf' );
const { getUsers } = require( "./users.js" );
const { getHomework, getSavedHomework, homeworkComparator, getHtml, saveHomeworks } = require( "./homework.js" );

const bot = new Telegram( process.env.TOKEN );

const notify = ( message ) => {
    const users = getUsers();

    for ( const { id } of users ) {
        bot.sendMessage( id, message );
    }
}

module.exports = async () => {
    const html = await getHtml( process.env.URL );
    const newHw = await getHomework( html );
    const oldHw = getSavedHomework();

    console.log( "Checking" );

    if ( !homeworkComparator( newHw, oldHw ) ) {
        let message = "";

        if ( newHw.length > oldHw.length ) {
            for ( const hw of newHw ) {
                if ( oldHw.find( ( { title } ) => title === hw.title ) === undefined ) {
                    message += `Появилось новое дз: ${hw.title}\n ${hw.href}\n\n`;
                }
            }

            if ( message.trim() !== "" ) {
                saveHomeworks( newHw );
                notify( message );
            }
        }
    }
}