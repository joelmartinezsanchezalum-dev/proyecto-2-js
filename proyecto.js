const prompt = require("prompt-sync")({ sigint: true })
const fs = require("fs");
// /**
//  * funcion que genera la carpeta de juego en caso de que 
//  * no exista, si existe lee la carpeta y los archivos
//  * correspondientes
//  *  */
// function carpetajuego() {
//     if (error == true) {
//         console.clear()
//     }
//     ficheros = (fs.readdirSync("./tauler"))
//     if (ficheros.length === 0) {
//         console.log("No hi ha cap tauler disponible.");
//         return;
//     } else {
//         for (let fichero of ficheros) {
//             let nomsinext = fichero.split(".")[0];
//             console.log(nomsinext);
//         }
//         if (error == true) {
//             console.log("Error amb la seleccio de tauler, no existeix")
//         }
//     }
//     let nomtablerouser = prompt("Introdueix la teva opcio: ");

//     if (fs.existsSync("./tauler/" + nomtablerouser + ".tauler")) {
//         console.log("Tauler seleccionat: " + nomtablerouser);

//     } else {
//         error = true
//         carpetajuego()
//     }
// }


// function llamada(valor1) {
//     if (valor1 == 0) {
//         console.clear();
//         console.log("Has seleccionat sortir del programa");
//         bucle = false;
//     } else if (valor1 == 1) {
//         if (fs.existsSync("./tauler")) { carpetajuego("") }
//         else {
//             fs.mkdirSync("./tauler")
//             carpetajuego("")
//         }
//     }
//     else if (valor1 == 2) {

//     } else if (valor1 == 3) {

//     } else if (valor1 == 4) {

//     } else {
//         console.log("Error, esta opcion no existe, pruebe de nuevo")
//     }
// }

// let bucle = true
// let ficheros = [];
// let error = false;

// while (bucle == true) {
//     console.log("----------------   ")
//     console.log("0- salir")
//     console.log("1- jugar")
//     console.log("2- estadisticas partidas")
//     console.log("3- estadisticas tableros")
//     console.log("4- crear tablero nuevo")
//     console.log("----------------")
//     let menuprincipal = Number.parseInt(prompt("Introdueix la teva opcio "));
//     llamada(menuprincipal);
// }

//lectura archivo tablero
let nomtablerouser = prompt("aisdasddasd")

let tablerojuego = fs.readFileSync("./tauler/"+nomtablerouser+".tauler")
let tablerojuegostring = tablerojuego.toString()
let arraytablerojuego = [];

for(let i= 0; i<tablerojuegostring.length; i++){
    arraytablerojuego.push(tablerojuegostring[i])
};
console.log(arraytablerojuego);








