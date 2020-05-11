import needle from "needle";
import fs from "fs";
import path from "path";

const URL = "https://ciur.ru//izh/s29_izh/DocLib39/10%D0%91"

const getHomework = async () => {
    const file = fs.readFileSync( path.resolve( "", "homework.json" ) ).toString();
    const object = JSON.parse( file );

    return object.homeworks;
}

console.log( fs.readFileSync( path.resolve( "", "homework.json" ) ).toString() )