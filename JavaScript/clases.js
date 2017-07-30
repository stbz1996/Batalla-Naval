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

	quitarVida(num){
		for (var i = 0; i < this.tamano; i++) {
			if (this.posiciones[i] == num) {
				this.vida = this.vida - 1;
			}
		}
	}

	eliminado(){
		if (this.vida == 0) { 
			return "el barco fue eliminado";
		}
		return "el barco fue eliminado";
	}
}