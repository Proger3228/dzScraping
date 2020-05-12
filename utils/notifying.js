import Telegram from 'Telegraf';
import { getUsers } from "./users.js";
import { getHomework, getSavedHomework, homeworkComparator, getHtml, saveHomeworks } from "./homework.js";

const TOKEN = "1140565061:AAGBmLhcbMAh5GpCFv1phmSdZyqNcgTAfO8";
const URL = "https://ciur.ru/izh/s29_izh/DocLib39/Forms/AllItems.aspx?RootFolder=%2fizh%2fs29%5fizh%2fDocLib39%2f10%d0%91&amp;FolderCTID=0x01200025E822D1C298894584C82F753E358CB1";

const bot = new Telegram.Telegram( TOKEN );

export const notify = ( message ) => {
    const users = getUsers();

    for ( const { id } of users ) {
        bot.sendMessage( id, message );
    }
}

export default async () => {
    const html = await getHtml( URL );
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