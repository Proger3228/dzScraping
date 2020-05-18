const fs = require( 'fs' );
const path = require( 'path' );
const cheerio = require( 'cheerio' );
const needle = require( 'needle' );

const dataPath = "./data.json"
const homeworkSelector = "#onetidDoclibViewTbl0 tr:not(:first-of-type) .ms-vb-title a:not([id])";

exports.getSavedHomework = () => {
    const object = require( path.resolve( "", dataPath ) );

    return object.homeworks;
}

exports.getHtml = ( url ) => {
    return new Promise( ( resolve, reject ) => {
        needle.get( url, ( err, res ) => {
            if ( err ) throw err;

            resolve( res.body );
        } )
    } )
}

exports.getHomework = ( html ) => {
    let homeworks;
    const items = [];
    const $ = cheerio.load( html );

    homeworks = $( homeworkSelector );

    homeworks.each( ( _, el ) => {
        const title = $( el ).text();
        const { href } = $( el ).attr();

        const hw = {
            title,
            href: href.split( " " ).join( "%20" )
        }

        items.push( hw );
    } )

    return items;
}

exports.saveHomeworks = ( homeworks ) => {
    if ( !Array.isArray( homeworks ) ) throw new TypeError( "Homeworks must be an array" );
    if ( homeworks.some( hw => !( "title" in hw ) || !( "href" in hw ) || Object.keys( hw ).length > 2 ) ) throw new TypeError( "All homeworks must have only title and href" )

    const oldFile = require( path.resolve( "", dataPath ) );

    fs.writeFile( path.resolve( "", dataPath ), JSON.stringify( { ...oldFile, homeworks } ), ( err ) => {
        if ( err ) throw err;
    } );
}

exports.homeworkComparator = ( oldHw, newHw ) => {
    if ( oldHw.length !== newHw.length ) return false;
    return oldHw.every( ( { title, href } ) => newHw.find( el => el.title === title && el.href === href ) !== undefined );
}