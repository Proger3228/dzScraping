import fs from 'fs';
import path from 'path';

const homeworkSelector = "#onetidDoclibViewTbl0 tr:not(:first-of-type) .ms-vb-title a:not([id])";

export const getSavedHomework = async () => {
    const file = fs.readFileSync( path.resolve( "", "./homework.json" ) ).toString();
    const object = JSON.parse( file );

    return object.homeworks;
}

export const getHtml = ( url ) => {
    return new Promise( ( resolve, reject ) => {
        needle.get( url, ( err, res ) => {
            if ( err ) throw err;

            resolve( res.body );
        } )
    } )
}

export const getHomework = ( html ) => {
    let homeworks;
    const items = [];
    const $ = cheerio.load( html );

    homeworks = $( homeworkSelector );

    homeworks.each( ( _, el ) => {
        const title = $( el ).text();
        const { href } = $( el ).attr();
        const hw = {
            title,
            href
        }

        items.push( hw );
    } )

    return items;
}

export const saveHomeworks = ( homeworks ) => {
    if ( !Array.isArray( homeworks ) ) throw new TypeError( "Homeworks must be an array" );
    if ( homeworks.some( hw => !( "title" in hw ) || !( "href" in hw ) || Object.keys( hw ).length > 2 ) ) throw new TypeError( "All homeworks must have only title and href" )

    const oldFile = JSON.parse( fs.readFileSync( path.resolve( "", "./homework.json" ) ).toString() );

    fs.writeFileSync( path.resolve( "", "./homework.json" ), JSON.stringify( { ...oldFile, homeworks } ) );
}

export const homeworkComparator = ( oldHw, newHw ) => {
    if ( oldHw.length !== newHw.length ) return false;
    return oldHw.every( ( { title, href } ) => newHw.find( el => el.title === title && el.href === href ) !== undefined );
}