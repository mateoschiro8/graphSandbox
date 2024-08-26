import { Nodo } from './nodo.js';

export class Grafo {
    constructor() {
        this.nodos = [];
    }

    draw(ctx) {
        this.nodos.forEach(nodo => {
            nodo.draw(ctx)
        });
    }

    agregarNodoAt(x, y) {
        const nuevoNodo = new Nodo(x, y);
        this.nodos.push(nuevoNodo);
    }

    sacarNodoAt(x, y) {
        let nodosViejosSize = this.nodos.length;
        this.nodos = this.nodos.filter(nodo => !nodo.isAt(x, y));
                    
        return (nodosViejosSize != this.nodos.length);
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