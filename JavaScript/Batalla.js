//////////////////////////////////////////////////////////////////////////////
// Las variables que se usan son traidas del archivo "colocacionBarcos.js" ///
//  - listaBarcosJugador1                                                  ///
//  - contadorlistaBarcosJugador1                                          ///
//  - listaBarcosJugador2                                                  ///
//  - contadorlistaBarcosJugador2                                          ///
//////////////////////////////////////////////////////////////////////////////

// variables
var jugadorActualBatalla = "Jugador 1";
var listaEspacionMarcados = new Array();
var contadorlistaEspacionMarcados = 0;
var listaPosicionesDestruidas = new Array();
var contadorlistaPosicionesDestruidas = 0;
var cantidadBarcosJugador1 = contadorlistaBarcosJugador1;
var cantidadBarcosJugador2 = contadorlistaBarcosJugador2;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function cerrarJuego(msj){
	document.getElementById("msj").innerHTML = "El GANADOR es el " + msj;
}

function cargaJuego(){
	if (jugadorActualBatalla == "Jugador 1") {
		habilitaCampoJugador2();
		document.getElementById("msj").innerHTML = "Es el turno del jugador 1";
	}
	else{
		habilitaCampoJugador1();
		document.getElementById("msj").innerHTML = "Es el turno del jugador 2";
	}
	llenarEspaciosGolpeados();
}

// habilita los espacios del mapa contrario al jugador que tenga el turno
function habilitaCampoJugador2(){
	for (var i = 1; i <= 64; i++) {document.getElementById("k" + i).style.background = "green";}
	for (var i = 1; i <= 64; i++) {document.getElementById("m" + i).style.background = "red";}
}

function habilitaCampoJugador1(){
	for (var i = 1; i <= 64; i++) {document.getElementById("m" + i).style.background = "green";}
	for (var i = 1; i <= 64; i++) {document.getElementById("k" + i).style.background = "red";}
}

// funciones de las casillas del mapa de juego 
function cambiarColorCasilla(valor){
	var colorOver = "blue";
	if ((jugadorActualBatalla == "Jugador 1") && (valor.id[0] == "k")) {
		document.getElementById(valor.id).style.background = colorOver;
	}
	if ((jugadorActualBatalla == "Jugador 2") && (valor.id[0] == "m")) {
		document.getElementById(valor.id).style.background = colorOver;
	}
	llenarEspaciosGolpeados();
}

function reestablecerColorCasilla(valor){
	if ((jugadorActualBatalla == "Jugador 1") && (valor.id[0] == "k")) {
		document.getElementById(valor.id).style.background = "green";
	}
	if ((jugadorActualBatalla == "Jugador 2") && (valor.id[0] == "m")) {
		document.getElementById(valor.id).style.background = "green";
	}
	llenarEspaciosGolpeados();
}

// llena los espacios que ya fueron usados por los jugadores
function llenarEspaciosGolpeados(){
	for (var i = 0; i < contadorlistaEspacionMarcados; i++) {
		document.getElementById(listaEspacionMarcados[i].cordenada).style.background = listaEspacionMarcados[i].color;
	}
	marcarBarcosDestruidos();
}

function marcarBarcosDestruidos(){
	for (var i = 0; i < contadorlistaPosicionesDestruidas; i++) {
		document.getElementById(listaPosicionesDestruidas[i]).style.background = "white";
	}
}


// busca si el disparo es correcto
function casillaSeleccionada(valor){	
	// si el jugador 1 toca una casilla valida del jugador 2
	if ((jugadorActualBatalla == "Jugador 1") && (valor.id[0] == "k")) {
		for (var i = 0; i < contadorlistaBarcosJugador2; i++) {
			for (var k = 0; k < listaBarcosJugador2[i].tamano; k++) {
				var cord = "k" + listaBarcosJugador2[i].posiciones[k];
				var pcolor = listaBarcosJugador2[i].color;
				if (cord == valor.id) {
					// se añade la posicion a la lista de lugares ya colpeados
					listaEspacionMarcados[contadorlistaEspacionMarcados] = new coordenada(cord, pcolor);
					contadorlistaEspacionMarcados++;
					llenarEspaciosGolpeados();
					
					// obtiene las vidas del barco golpeado
					var vidas = listaBarcosJugador2[i].quitarVida();
					if (vidas == 0) {
						for (var r = 0; r < listaBarcosJugador2[i].tamano; r++) {
							listaPosicionesDestruidas[contadorlistaPosicionesDestruidas] = "k" + listaBarcosJugador2[i].posiciones[r];
							contadorlistaPosicionesDestruidas++;
						}
						cantidadBarcosJugador2 = cantidadBarcosJugador2 - 1;
						if (cantidadBarcosJugador2 <= 0) {
							// gana el jugador 1
							cerrarJuego("Jugador 1");
						}
					}
					//alert("golpeo el barco --- " + cord + " --- " + pcolor);////////////////////////////////////
					// se golpea un barco enemigo
					
					return true;
				}
			}
		}
		listaEspacionMarcados[contadorlistaEspacionMarcados] = new coordenada(valor.id, "black");
		contadorlistaEspacionMarcados++;
		jugadorActualBatalla = "Jugador 2";
		
	}




	// si el jugador 2 toca una casilla valida del jugador 2
	if ((jugadorActualBatalla == "Jugador 2") && (valor.id[0] == "m")) {
		for (var i = 0; i < contadorlistaBarcosJugador1; i++) {
			for (var k = 0; k < listaBarcosJugador1[i].tamano; k++) {
				var cord = "m" + listaBarcosJugador1[i].posiciones[k];
				var pcolor = listaBarcosJugador1[i].color;
				if (cord == valor.id) {
					// se añade la posicion a la lista de lugares ya colpeados
					listaEspacionMarcados[contadorlistaEspacionMarcados] = new coordenada(cord, pcolor);
					contadorlistaEspacionMarcados++;
					llenarEspaciosGolpeados();
					var vidas = listaBarcosJugador1[i].quitarVida();
					if (vidas == 0) {
						for (var r = 0; r < listaBarcosJugador1[i].tamano; r++) {
							listaPosicionesDestruidas[contadorlistaPosicionesDestruidas] = "m" + listaBarcosJugador1[i].posiciones[r];
							contadorlistaPosicionesDestruidas++;
						}
						cantidadBarcosJugador1 = cantidadBarcosJugador1 - 1;
						if (cantidadBarcosJugador1 <= 0) {
							// gana el jugador 1
							cerrarJuego("Jugador 2");
						}
					}
					//alert("golpeo el barco --- " + cord + " --- " + pcolor);////////////////////////////////////
					return true;
				}
			}
		}
		listaEspacionMarcados[contadorlistaEspacionMarcados] = new coordenada(valor.id, "black");
		contadorlistaEspacionMarcados++;
		jugadorActualBatalla = "Jugador 1";
	}
	
	cargaJuego();
	llenarEspaciosGolpeados();
}





