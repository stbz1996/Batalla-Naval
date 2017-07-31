// Clases 
class barco{
	constructor(pTamano, pColor, pPosiciones){
		this.tamano = pTamano;
		this.vida = this.tamano;
		this.posiciones = pPosiciones;
		this.color = pColor;
	}

	introducirPosiciones(lista){
		this.posiciones = lista;
	}


	quitarVida(){
		this.vida = this.vida - 1;
		return this.vida;		
	}

	eliminado(){
		if (this.vida == 0) { 
			return "el barco fue eliminado";
		}
		return "el barco fue eliminado";
	}
}






class coordenada{
	constructor(idcordenada, pcolor){
		this.cordenada = idcordenada;
		this.color = pcolor;
	}
}