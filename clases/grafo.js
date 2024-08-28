import { Nodo } from './nodo.js';
import { Arista } from './arista.js';

export class Grafo {
    constructor(radio) {
        this.nodos = [];
        this.aristas = [];
        this.radio = radio;
    }

    draw(ctx) {
        this.nodos.forEach(nodo => {
            nodo.draw(ctx)
        });
        this.aristas.forEach(arista => {
            arista.draw(ctx)
        });
    }

    agregarNodoAt(x, y) {
        const nuevoNodo = new Nodo(x, y, this.radio);
        this.nodos.push(nuevoNodo);
    }

    sacarNodoAt(x, y) {

        let nodoASacar = this.nodos.filter(nodo => nodo.isAt(x, y));
        
        let nodosViejosSize = this.nodos.length;
    
        if(nodoASacar.lenght == 0) return;
        nodoASacar[0].borrarAristas();
        
        this.nodos = this.nodos.filter(nodo => !nodo.isAt(x, y));
                    
        return (nodosViejosSize != this.nodos.length);
    }
    
    agregarArista(x1, y1, x2, y2) {

        
        let nodosArista = this.nodos.filter(nodo => {
            return nodo.isAt(x1, y1) || nodo.isAt(x2, y2);
        });
        
        
        if(nodosArista.length != 2) 
            return;

        
        if(this.aristas.some(arista => arista.tieneNodos(nodosArista[0], nodosArista[1])))
            return;

        const arista = new Arista(nodosArista[0], nodosArista[1], this, this.radio);
        this.aristas.push(arista);
        nodosArista.forEach(nodo =>{
            nodo.agregarArista(arista);
        });

    }

    borrarUnaArista(arista) {
        this.aristas = this.aristas.filter(a => a !== arista);
    }

    resaltarNodoAt(x, y) {
        this.nodos.forEach(nodo => {
            if(nodo.isAt(x, y)) {
                nodo.resaltar();
            } else {
                nodo.noResaltar();
            }
        });
    }
}