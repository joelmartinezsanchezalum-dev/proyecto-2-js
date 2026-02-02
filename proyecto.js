const prompt = require("prompt-sync")({ sigint: true })
const { table } = require("console");
const fs = require("fs");
const { arch } = require("os");
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
        let mostrarTableroFinal = tablerofinal.map(fila => fila.join("")).join("\n");
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
        console.clear();
        console.log("=== ESTADISTIQUES DE LES PARTIDES ===");

        if (fs.existsSync("partides.csv")) {

            let dades = fs.readFileSync("partides.csv", "utf-8");

            let linies = dades.split("\n"); // para separar cada partida por lineas individuales

            // para quitar vacios
            let partides = linies.filter(linia => linia.trim() !== "");

            // para eliminar la primera linea que no es una partida
            if (partides.length > 0) {
                partides.shift();
            }


            partides.reverse();  // invertimos el array


            // Cogemos solo las 10 primeras
            let ultimas10 = partides.slice(0, 10);


            //Mostramos los datos
            for (let i = 0; i < ultimas10.length; i++) {
                let camps = ultimas10[i].split(";"); // separamos por punto y coma

                console.log("\nPartida " + (i + 1) + ":");
                console.log(" - Data: " + camps[0]);

                //se guardan los minutos por lo que dividimos por 1000
                let segons = Math.floor(parseInt(camps[1]) / 1000);
                console.log(" - Temps: " + segons + " segons"); //

                console.log(" - Tauler: " + camps[2]); //
                console.log(" - Resposta usuari: " + camps[3]);
                console.log(" - Resultat: " + camps[4]);
                console.log("--------------------------------");
            }
        } else {
            console.log("Encara no hi ha partides registrades.");
        }
        //  ENTER para volver al menú
        prompt("Prem ENTER per tornar al menú...");
    } else if (valor1 == 3) {
        console.clear();
        console.log("=== ESTADÍSTIQUES DELS TAULELLS ===");
        let numtaulers = 0;
        let archivostableros = fs.readdirSync("./tauler")
        for (let i = 0; i < archivostableros.length; i++) {
            numtaulers = numtaulers + 1;
        }
        if (archivostableros.length === 0) {
            console.log("No hi ha taulers disponibles.");
            prompt("Prem ENTER per tornar al menú...");
            return;
        }

        let totalDiferencies = 0;
        let totalAmplada = 0;
        let totalAlcada = 0;
        let totalArea = 0;

        for (let i = 0; i < archivostableros.length; i++) {

            let tablerojuego = fs.readFileSync("./tauler/" + archivostableros[i]);
            let tablerojuegostring = tablerojuego.toString().split("\n");

            // Informació del tauler
            let informaciontablero = tablerojuegostring[0].split(" ").map(v => Number.parseInt(v));

            let amplada = informaciontablero[0];
            let alcada = informaciontablero[1];
            let diferencies = informaciontablero[2];
            let area = amplada * alcada;

            totalAmplada += amplada;
            totalAlcada += alcada;
            totalDiferencies += diferencies;
            totalArea += area;
        }
        let numTaulers = archivostableros.length;
        console.log("\nN'hi han " + numtaulers + " taulers");
        console.log("Mitjana de diferències: " + (totalDiferencies / numTaulers).toFixed(2));
        console.log("Amplada mitjana: " + (totalAmplada / numTaulers).toFixed(2));
        console.log("Alçada mitjana: " + (totalAlcada / numTaulers).toFixed(2));
        console.log("Àrea mitjana: " + (totalArea / numTaulers).toFixed(2));

        console.log("--------------------------------");
        prompt("Prem ENTER per tornar al menú...");

    } else if (valor1 == 4) {
        console.clear();
        console.log("=== CREACIÓ DE NOU TAULER ===");


        let nomNouTauler;
        let nomValid = false;


        // para validadar el nombre
        while (nomValid == false) {
            nomNouTauler = prompt("Nom del nou tauler : ");
            // Comprobamos si el archivo ya existe en la carpeta tauler/
            if (fs.existsSync("./tauler/" + nomNouTauler + ".tauler")) {
                console.log("Error: Aquest nom ja existeix. Tria un altre.");
            } else if (nomNouTauler.trim() == "") {
                console.log("Error: El nom no pot estar buit.");
            } else {
                nomValid = true; // Si no existe, salimos del bucle
            }
        }


        let alçada;
        let alçadaValida = false;


        //  VALIDACIÓN DE ALTURA DEL TABLERO
        while (alçadaValida == false) {
            alçada = Number.parseInt(prompt("Alçada del tauler: "));
            if (isNaN(alçada) || alçada <= 0) {
                console.log("Error: L'alçada ha de ser un numero més gran que 0.");
            } else {
                alçadaValida = true;
            }
        }


        let amplada;
        let ampladaValida = false;


        // VALIDACIÓN DE ANCHURA DEL TABLERO
        while (ampladaValida == false) {
            amplada = Number.parseInt(prompt("Amplada del tauler: "));
            if (isNaN(amplada) || amplada <= 0) {
                console.log("Error: L'amplada ha de ser un numero més gran que 0.");
            } else {
                ampladaValida = true;
            }
        }


        // VALIDACIÓN DE DIFERENCIAS
        let maxDiferencies = alçada * amplada; // Área total
        let diferencies;
        let difValides = false;


        while (difValides == false) {
            console.log("Màxim de diferències possibles: " + maxDiferencies);
            diferencies = Number.parseInt(prompt("Número de diferències a amagar: "));

            if (isNaN(diferencies) || diferencies < 0 || diferencies > maxDiferencies) {
                console.log("Error: El número ha d'estar entre 0 i " + maxDiferencies);
            } else {
                difValides = true;
            }
        }


        console.log("Dades validades correctament. Generant tauler...");

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







