const prompt = require("prompt-sync")({ sigint: true })
const fs = require("fs");
/**
 * funcion que genera la carpeta de juego en caso de que 
 * no exista, si existe lee la carpeta y los archivos
 * correspondientes
 *  */
function carpetajuego() {
    if (error == true) {
        console.clear()
    }
    ficheros = (fs.readdirSync("./tauler"))
    if (ficheros.length === 0) {
        console.log("No hi ha cap tauler disponible.");
        return;
    } else {
        for (let fichero of ficheros) {
            let nomsinext = fichero.split(".")[0];
            console.log(nomsinext);
        }
        if (error == true) {
            console.log("Error amb la seleccio de tauler, no existeix")
        }
    }
    let nomtablerouser = prompt("Introdueix la teva opcio: ");
    if (fs.existsSync("./tauler/" + nomtablerouser + ".tauler")) {
        let iniciPartida = Date.now();
        let tablerojuego = fs.readFileSync("./tauler/" + nomtablerouser + ".tauler")
        console.log("Tauler seleccionat: " + nomtablerouser);
        // tablero pasado a string
        let tablerojuegostring = tablerojuego.toString()
        // tablero separado por saltos
        tablerojuegostring = tablerojuegostring.split("\n");
        //tablero separado por espacio ( indice 0 asi que es la informacion)
        let informaciontablero = tablerojuegostring[0].split(" ")
        informaciontablero = informaciontablero.map(v => Number.parseInt(v))
        //eliminacion de 1ra fila 
        //creacion de un array de informacion
        let arrayfilajuego = [];
        let tablerofinal = [];
        for (let fila = 1; fila < informaciontablero[1] + 1; fila++) {
            //escritura de la linea entera
            //tab izq
            for (let columna = 0; columna < informaciontablero[0]; columna++) {
                arrayfilajuego.push(tablerojuegostring[fila][columna])
            }
            //salto
            arrayfilajuego.push(" | ")
            //tablero der
            for (let columna = 0; columna < informaciontablero[0]; columna++) {
                arrayfilajuego.push(tablerojuegostring[fila + informaciontablero[1] + 1][columna])
            }
            tablerofinal.push(arrayfilajuego)
            arrayfilajuego = [];
        }
        let mostrarTableroFinal = tablerofinal[0].join("") + "\n" + tablerofinal[1].join("") + "\n" + tablerofinal[2].join("")
        console.log(mostrarTableroFinal)
        let diferencias = Number.parseInt(prompt("Diferències trobades: "))
        if (diferencias == informaciontablero[2]) {
            console.log("Resposta correcta, molt bé!")
        } else {
            (console.log("Resposta incorrecta"))
        }
        // fi de la partida
        let fiPartida = Date.now();
        let duracio = fiPartida - iniciPartida; // en mil·lisegons

        // formatar data
        let dataPartida = new Date(iniciPartida).toLocaleString();

        // nom del tauler sense extensió
        let nomTauler = nomtablerouser;

        // resposta usuari
        let respostaUsuari = diferencias;

        // guanyat o perdut
        let resultat = (diferencias == informaciontablero[2]) ? "Guanyat" : "Perdut";

        // crear línia CSV
        let liniaCSV = `${dataPartida};${duracio};${nomTauler};${respostaUsuari};${resultat}\n`;

        // si no existeix el fitxer, crear-lo amb capçalera
        if (!fs.existsSync("partides.csv")) {
            fs.writeFileSync("partides.csv", "Data;Duracio(ms);Tauler;Resposta;Resultat\n");
        }

        // afegir la línia
        fs.appendFileSync("partides.csv", liniaCSV);

        // esperar ENTER per tornar al menú
        prompt("Prem ENTER per tornar al menú...");

    } else {
        error = true
        carpetajuego()
    }
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
let ficheros = [];
let error = false;
while (bucle == true) {
    console.log("----------------   ")
    console.log("0- Sortir")
    console.log("1- Jugar")
    console.log("2- estadistiques de partides")
    console.log("3- estadistiques dels taulells")
    console.log("4- crear taulell nou")
    console.log("----------------   ")
    let menuprincipal = Number.parseInt(prompt("Introdueix la teva opcio "));
    llamada(menuprincipal);
}

// //lectura archivo tablero
// let nomtablerouser = prompt("Quin tauler vols seleccionar? ")
// //lectura tablero pasa a una variable
// let tablerojuego = fs.readFileSync("./tauler/" + nomtablerouser + ".tauler")
// // tablero pasado a string
// let tablerojuegostring = tablerojuego.toString()
// // tablero separado por saltos
// tablerojuegostring = tablerojuegostring.split("\n");
// //tablero separado por espacio ( indice 0 asi que es la informacion)
// let informaciontablero = tablerojuegostring[0].split(" ")
// informaciontablero = informaciontablero.map(v => Number.parseInt(v))
// //eliminacion de 1ra fila 
// //creacion de un array de informacion
// let arrayfilajuego = [];
// let tablerofinal = [];
// for (let fila = 1; fila < informaciontablero[1] + 1; fila++) {
//     //escritura de la linea entera
//     //tab izq
//     for (let columna = 0; columna < informaciontablero[0]; columna++) {
//         arrayfilajuego.push(tablerojuegostring[fila][columna])
//     }
//     //salto
//     arrayfilajuego.push(" ")
//     //tablero der
//     for (let columna = 0; columna < informaciontablero[0]; columna++) {
//         arrayfilajuego.push(tablerojuegostring[fila + informaciontablero[1] + 1][columna])
//     }
//     tablerofinal.push(arrayfilajuego)
//     arrayfilajuego = [];
// }
// let mostrarTableroFinal = tablerofinal[0].join("") + "\n" + tablerofinal[1].join("") + "\n" + tablerofinal[2].join("")
// console.log(mostrarTableroFinal)







