const prompt = require("prompt-sync")({ sigint: true })
const fs = require("fs");
/**
 * funcion que genera la carpeta de juego en caso de que 
 * no exista, si existe lee la carpeta y los archivos
 * correspondientes
 *  */
function carpetajuego() {
    console.log("Llista de taulers disponibles: ");
    extarchivos = (fs.readdirSync("./tauler"))
    extarchivos.toString()
    console.log(extarchivos);
    let nomtablerouser = prompt("Introdueix la teva opcio");
}


function llamada(valor1) {
    if (valor1 == 0) {
        console.clear();
        console.log("Has seleccionat sortir del programa");
        bucle = false;
    } else if (valor1 == 1) {
        if (fs.existsSync("./tauler")) { carpetajuego("") }
        else {
            fs.mkdirSync("./tauler")
            carpetajuego("")
        }
    }
    else if (valor1 == 2) {

    } else if (valor1 == 3) {

    } else if (valor1 == 4) {

    } else {
        console.log("Error, esta opcion no existe, pruebe de nuevo")
    }
}

let bucle = true
let extarchivos = [];

while (bucle == true) {
    console.log("----------------   ")
    console.log("0- salir")
    console.log("1- jugar")
    console.log("2- estadisticas partidas")
    console.log("3- estadisticas tableros")
    console.log("4- crear tablero nuevo")
    console.log("----------------")
    let menuprincipal = Number.parseInt(prompt("Introdueix la teva opcio "));
    llamada(menuprincipal);
}




