//////////////////////////////////////////////////////////////////////////////
// Las variables que se usan son traidas del archivo "colocacionBarcos.js" ///
//  - listaBarcosJugador1                                                  ///
//  - listaBarcosJugador2                                                  ///
//////////////////////////////////////////////////////////////////////////////

								// #####################
								// ###   variables   ###
								// #####################
								
var jugadorActualBatalla = "Jugador 1";
var listaEspacionMarcados = new Array();
var listaPosicionesDestruidas = new Array();
var cantidadBarcosJugador1;
var cantidadBarcosJugador2;

								// #####################
								// ###   funciones   ###
								// #####################

// termina cuando hay un ganador
function cerrarJuego(msj){
	document.getElementById("msj").innerHTML = "El GANADOR es el " + msj;
}

// se encarga de iniciar los componentes del juego
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
	for (var i = 1; i <= 64; i++) {document.getElementById("m" + i).style.background = "#CE2BB0";}
}

function habilitaCampoJugador1(){
	for (var i = 1; i <= 64; i++) {document.getElementById("m" + i).style.background = "green";}
	for (var i = 1; i <= 64; i++) {document.getElementById("k" + i).style.background = "#CE2BB0";}
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
	for (var i = 0; i < listaEspacionMarcados.length; i++) {
		document.getElementById(listaEspacionMarcados[i].cordenada).style.background = listaEspacionMarcados[i].color;
	}
	marcarBarcosDestruidos();
}

function marcarBarcosDestruidos(){
	for (var i = 0; i < listaPosicionesDestruidas.length; i++) {
		document.getElementById(listaPosicionesDestruidas[i]).style.background = "white";
	}
}

// busca si el disparo es correcto
function casillaSeleccionada(valor){	
	// si el jugador 1 toca una casilla valida del jugador 2
	if ((jugadorActualBatalla == "Jugador 1") && (valor.id[0] == "k")) {
		for (var i = 0; i < listaBarcosJugador2.length; i++) {
			for (var k = 0; k < listaBarcosJugador2[i].tamano; k++) {
				var cord = "k" + listaBarcosJugador2[i].posiciones[k];
				var pcolor = listaBarcosJugador2[i].color;
				if (cord == valor.id) {
					// se añade la posicion a la lista de lugares ya colpeados
					listaEspacionMarcados[listaEspacionMarcados.length] = new coordenada(cord, pcolor);
					llenarEspaciosGolpeados();
					// obtiene las vidas del barco golpeado
					var vidas = listaBarcosJugador2[i].quitarVida();
					if (vidas == 0) {
						cantidadBarcosJugador2--;
						for (var r = 0; r < listaBarcosJugador2[i].tamano; r++) {
							listaPosicionesDestruidas[listaPosicionesDestruidas.length] = "k" + listaBarcosJugador2[i].posiciones[r];
						}
						if (cantidadBarcosJugador2 == 0) {cerrarJuego("Jugador 1");}
					}
					return true;
				}
			}
		}
		listaEspacionMarcados[listaEspacionMarcados.length] = new coordenada(valor.id, "black");
		jugadorActualBatalla = "Jugador 2";
		
	}
	// si el jugador 2 toca una casilla valida del jugador 2
	if ((jugadorActualBatalla == "Jugador 2") && (valor.id[0] == "m")) {
		for (var i = 0; i < listaBarcosJugador1.length; i++) {
			for (var k = 0; k < listaBarcosJugador1[i].tamano; k++) {
				var cord = "m" + listaBarcosJugador1[i].posiciones[k];
				var pcolor = listaBarcosJugador1[i].color;
				if (cord == valor.id) {
					// se añade la posicion a la lista de lugares ya colpeados
					listaEspacionMarcados[listaEspacionMarcados.length] = new coordenada(cord, pcolor);
					llenarEspaciosGolpeados();
					var vidas = listaBarcosJugador1[i].quitarVida();
					if (vidas == 0) {
						cantidadBarcosJugador1--;
						for (var r = 0; r < listaBarcosJugador1[i].tamano; r++) {
							listaPosicionesDestruidas[listaPosicionesDestruidas.length] = "m"+listaBarcosJugador1[i].posiciones[r];
						}
						if (cantidadBarcosJugador1 == 0) {cerrarJuego("Jugador 2");}
					}
					return true;
				}
			}
		}
		listaEspacionMarcados[listaEspacionMarcados.length] = new coordenada(valor.id, "black");
		jugadorActualBatalla = "Jugador 1";
	}
	cargaJuego();
	llenarEspaciosGolpeados();
}





