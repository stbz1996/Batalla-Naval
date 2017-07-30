					// ####################
					// ###   Variables  ###
					// ####################

// Algunas de las variables seran usadas a la hora de jugar, 
// en el script de "juego" se especifican cuales son. 
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



					// #####################
					// ###   funciones   ###
					// #####################

// permite seleccionar un barco
function seleccionarBarco(valor, pColor, boton) {
	deshabilitaBotones(boton); 
	cantidadEspaciosDelBarco = valor;
	habilitaCuadros();
	llenarEspaciosOcupados();
	colorBarcoActual = pColor;
}

// Ejecuta cuando el mause pasa por encima, decifra las posiciones
function marcar(valor){
	if (mapaHabilitado) {
		var cant = cantidadEspaciosDelBarco;
		var contador1 = valor;
		var lista = new Array();
		var contadorLista = 0;
		while((contador1 % 8) != 0){contador1 = contador1 + 1;}
		for (var i = 0; i < cantidadEspaciosDelBarco; i++) {
			if ((valor+i) <= contador1) {
				document.getElementById("c" + (valor+i)).style.background = "black";	
				cant = cant -1;
				lista[contadorLista] = valor+i;
				contadorLista++;
			}
		}
		for (var i = 1; i <= cant; i++) {
			document.getElementById("c" + (valor-i)).style.background = "black";
			lista[contadorLista] = valor-i;
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
		alert("Se ha agregado el barco");
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





// NOTA, quitar la funcion desmarcar