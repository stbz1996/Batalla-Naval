					// ####################
					// ###   Variables  ###
					// ####################

// Algunas de las variables seran usadas a la hora de jugar, 
// en el script de "juego" se especifican cuales son. 
var listaBarcosJugador1 = new Array();
var contadorlistaBarcosJugador1 = 0;
var listaBarcosJugador2 = new Array();
var contadorlistaBarcosJugador2 = 0;
////////////////////////////////////////////////////////////
var jugadorActual = "jugador1";
var mapaHabilitado = false;
var colorBarcoActual;
var cantidadEspaciosDelBarco = 0;
var listaPosicionesTemporales;
var contadorlistaPosicionesTemporales = 0;
var espaciosOcupados = new Array();
var contadorespaciosOcupados = 0;
var listaBarcos = new Array();
var contadorlistaBarcos = 0;
var direccionBusqueda = 'h';
var barcoActual;

var barcosUsados = new Array();
barcosUsados[1] = 0;
barcosUsados[2] = 0;
barcosUsados[3] = 0;
barcosUsados[4] = 0;
barcosUsados[5] = 0;

					// #####################
					// ###   funciones   ###
					// #####################

// Ajusta el marcado de las lineas al seleccionar el barco
function cambiarDireccionMarcado(valor){direccionBusqueda = valor;}

// permite seleccionar un barco
function seleccionarBarco(valor, pColor, boton) {
	habilitarBotones();
	deshabilitaBotones(boton); 
	cantidadEspaciosDelBarco = valor;
	habilitaCuadros();
	llenarEspaciosOcupados();
	colorBarcoActual = pColor;
	barcoActual = boton;
}

// Ejecuta cuando el mause pasa por encima, decifra las posiciones
function marcar(valor){
	if (mapaHabilitado) {
		var cant = cantidadEspaciosDelBarco;
		var contador1 = valor;
		var lista = new Array();
		var contadorLista = 0;

		// Verifica la direccion en la que debe marcar
		if (direccionBusqueda == 'v') {
			while(contador1 < 57){contador1 = contador1 + 8;}
			var valorControl = 8; // si es vertival, 1 si es horizontal
		}
		if (direccionBusqueda == 'h') {
			while((contador1 % 8) != 0){contador1 = contador1 + 1;}
			var valorControl = 1; // si es vertival, 1 si es horizontal
		}

		// Marca los espacios temporalmente
		for (var i = 0; i < cantidadEspaciosDelBarco; i++) {
			if ( (valor + (valorControl * i)) <= contador1) {
				document.getElementById("c"+(valor+ (i*valorControl))).style.background = "black";	
				cant = cant - 1;
				lista[contadorLista] = valor + (i*valorControl);
				contadorLista++;
			}
		}
		for(var i = 1; i <= cant; i++) {
			document.getElementById("c" + (valor-(i*valorControl))).style.background = "black";
			lista[contadorLista] = valor-(i*valorControl);
			contadorLista++;
		}	
		listaPosicionesTemporales = lista;
		contadorlistaPosicionesTemporales = contadorLista;
		llenarEspaciosOcupados();
	}
}

// Ejecta cuando el mouse sale de un cuadro, limpia los cuadros
function desmarcar(valor){
	if (mapaHabilitado) {
		habilitaCuadros();
		llenarEspaciosOcupados();
	}
}

// Ejecuta cuando se hace click en un espacio, guarda el barco en la posicion indicada
function selectEspacio(valor){
	if (mapaHabilitado) {
		// verifica que ningun espacio este ya ocupado
		for (var i = 0; i < contadorespaciosOcupados; i++) {
			for (var k = 0; k < contadorlistaPosicionesTemporales; k++) {
				if (espaciosOcupados[i] == listaPosicionesTemporales[k]) {
					alert("No se puede colocar el barco en esta posicion");
					return true;
				}
			}
		}
		// Añade las posiciones a la lista de ocupadas
		anadeEspaciosOcupados(listaPosicionesTemporales, contadorlistaPosicionesTemporales);
		// Crea el objeto barco y lo agrega a la lista 
		var pBarco = new barco(cantidadEspaciosDelBarco, colorBarcoActual, listaPosicionesTemporales);
		listaBarcos[contadorlistaBarcos] = pBarco;
		contadorlistaBarcos++;
		deshabilitaCuadros();
		llenarEspaciosOcupados();
		document.getElementById("barco" + barcoActual).style.display = 'none';
		barcosUsados[barcoActual] = 1;
		habilitarBotones();
	}
}

// llena los espacios en el mapa
function llenarEspaciosOcupados() {
	for (var i = 0; i < contadorlistaBarcos; i++) {
		for (var k = 0; k < listaBarcos[i].tamano; k++) {
			document.getElementById("c"+listaBarcos[i].posiciones[k]).style.background = listaBarcos[i].color;
		}
	}
}

// añade los valores a al lista de espacios utilizados
function anadeEspaciosOcupados(lista, tamano){
	for (var i = 0; i < contadorlistaPosicionesTemporales; i++) {
		espaciosOcupados[contadorespaciosOcupados] = listaPosicionesTemporales[i];
		contadorespaciosOcupados++;
	}
}

// habilita los cuadros cuando se selecciona un barco
function habilitaCuadros(){
	for (var i = 1; i <= 64; i++) {
		var div = "c" + i;
		document.getElementById(div).style.background = "green";
	}
	mapaHabilitado = true;
}

// desabilita los cuadros cuando se va a seleccionar un barco
function deshabilitaCuadros(){
	for (var i = 1; i <= 64; i++) {
		var div = "c" + i;
		document.getElementById(div).style.background = "red";
	}
	mapaHabilitado = false;
}

// deshabilita los botones
function deshabilitaBotones(num){
	if (num == 1) {document.form1.b1.disabled=true;}
	if (num == 2) {document.form1.b2.disabled=true;}
	if (num == 3) {document.form1.b3.disabled=true;}
	if (num == 4) {document.form1.b4.disabled=true;}
	if (num == 5) {document.form1.b5.disabled=true;}
}

// habilita los botones 
function habilitarBotones(){
	for (var i = 1; i < 6; i++) {
		if (barcosUsados[i] == 0) {
			if (i == 1) {document.form1.b1.disabled=false;}
			if (i == 2) {document.form1.b2.disabled=false;}
			if (i == 3) {document.form1.b3.disabled=false;}
			if (i == 4) {document.form1.b4.disabled=false;}
			if (i == 5) {document.form1.b5.disabled=false;}
		}
	}
}


function pasarTurno(){
	//alert(jugadorActual + "");
	if (jugadorActual == "jugador1") {
		listaBarcosJugador1 = listaBarcos;
		contadorlistaBarcosJugador1 = contadorlistaBarcos;
		jugadorActual = "jugador2";
		limpiarVariables();
	}
	else{
		listaBarcosJugador2 = listaBarcos;	
		contadorlistaBarcosJugador2 = contadorlistaBarcos;
		// envia los datos de las posiciones de los barcos a la pantalla siguiente
		iniciarJuego();
	}
}

// limpia los barcos y datos usados
function limpiarVariables(){
	for (var i = 1; i < 6; i++) {
		document.getElementById("barco" + i).style.display = 'block';
		barcosUsados[i] = 0;
	}
	habilitarBotones();
	var mapaHabilitado = false;
	var cantidadEspaciosDelBarco = 0;
	var contadorlistaPosicionesTemporales = 0;
	espaciosOcupados = new Array();
	contadorespaciosOcupados = 0;
	listaBarcos = new Array();
	contadorlistaBarcos = 0;
	direccionBusqueda = 'h';
	deshabilitaCuadros();
}

// esta funcion envia al inicio del juego. las funcionalidades se encuentran en
// el archivo "juego.js"
function iniciarJuego(){
	document.getElementById("espacio").style.display = 'none';
	document.getElementById("tableroJuego").style.display = 'block';
	cargaJuego();
}