function LinkedList() {
    var Node = function(element){
        this.element = element;
        this.next = null;
    };
 
    var listSize = 0;
    var headNode = null;
 
    this.add = add;
    this.insert = insert;
    this.remove = remove;
    this.removeFrom = removeFrom;
    this.indexOf = indexOf;
    this.hasElements = hasElements;
    this.size = size;
    this.toString = toString;
 
    function add(element) {
        var node = new Node(element);
        var currentNode;
 
        // Verificamos si es el primer nodo en la lista
        if (!headNode) {
            headNode = node;
        } else {
            currentNode = headNode;
 
            // Este ciclo se ejecuta hasta que llegue al último elemento
            while (currentNode.next) {
                currentNode = currentNode.next;
            }
 
            // Obtenemos el último elemento y lo asigamos a next para crear el enlace
            currentNode.next = node;
        }
 
        // Incrementamos el tamaño de la lista
        listSize++;
    }
 
    function insert(element, pos) {
        // Verificamos que la posición exista
        if (pos > -1 && pos < listSize) {
            var node = new Node(element);
            var currentNode = headNode;
            var previousNode;
            var index = 0;
 
            // Primer elemento
            if (pos === 0) {
                node.next = currentNode;
                headNode = node;
            } else {
                while (index++ < pos) {
                    previousNode = currentNode;
                    currentNode = currentNode.next;
                }
 
                node.next = currentNode;
                previousNode.next = node;
            }
 
            listSize++;
 
            return true;
        }
 
        return false;
    }
 
    function remove(element) {
        var index = this.indexOf(element);
 
        return this.removeFrom(index);
    }
 
    function removeFrom(pos) {
        // Verificamos que la posición exista
        if (pos > -1 && pos < listSize) {
            var currentNode = headNode;
            var previousNode;
            var index = 0;
 
            // Si pos 0, entonces eliminaremos el primer elemento.
            if (pos === 0) {
                headNode = currentNode.next;
            } else {
                while (index++ < pos) {
                    // Mandamos el nodo actual a previous
                    previousNode = currentNode;
 
                    // Ahora el actual será el next
                    currentNode = currentNode.next;
                }
 
                // Enlazamos el next de previous con el next del nodo actual (lo saltamos para eliminarlo)
                previousNode.next = currentNode.next;
            }
 
            // Restamos el elemento eliminado de la lista
            listSize--;
 
            // Retornamos el valor del elemento eliminado
            return currentNode.element;
        } 
 
        // Si la posición esta fuera de rangos regresamos null
        return null;
    }
 
    function indexOf(element) {
        var currentNode = headNode;
        var index = 0;
 
        while (currentNode) {
            if (currentNode.element === element) {
                return index;
            }
 
            index++;
            currentNode = currentNode.next;
        }
 
        return -1;
    }
 
    function hasElements() {
        return listSize > 0;
    }
 
    function size() {
        return listSize;
    }
 
    function toString() {
        var currentNode = headNode;
        var str = '|';
 
        while (currentNode) {
            str += currentNode.element + '|';
            currentNode = currentNode.next;
        }
 
        return str;
    }
}