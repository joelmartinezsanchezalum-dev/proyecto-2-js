const prompt = require("prompt-sync")({ sigint: true })
const fs = require("fs");

function llamada(valor1) {

    if (valor1 == 0) {
        console.clear();
        console.log("Has seleccionat sortir del programa");
        bucle = false;
    } else if (valor1 == 1) {
        console.log("Llista de taulers disponibles: ");
        fs.mkdir
        console.log(fs.readdirSync("./tauler").toString);
        let nomtablerouser = prompt("Introdueix la teva opcio");
        fs.existsSync("./" + nomtablerouser)    
    } else if (valor1 == 2) {

    } else if (valor1 == 3) {

    } else if (valor1 == 4) {

    } else { 
        console.log ("Error, esta opcion no existe, pruebe de nuevo")
    }


}

let bucle = true


while (bucle == true) {
    console.log("----------------   ")
    console.log("0- salir")
    console.log("1- jugar")
    console.log("2- estadisticas partidas")
    console.log("3- estadisticas tableros")
    console.log("4- crear tablero nuevo")
    console.log("----------------")
    let menuprincipal = Number.parseInt(prompt("Introdueix la teva opcio"));
    llamada(menuprincipal);
}