
export class Arista {
    constructor(nodo1, nodo2, grafo, radio, peso = 1) {
        this.nodo1 = nodo1;
        this.nodo2 = nodo2;
        this.grafo = grafo;
        this.radio = radio;
        this.peso = peso;
    }

    draw(ctx) {
        
        // Perdón HW
        const x1 = this.nodo1.x;
        const y1 = this.nodo1.y;
        const x2 = this.nodo2.x;
        const y2 = this.nodo2.y;
    
        const dx = x2 - x1;
        const dy = y2 - y1;
        const distancia = Math.sqrt(dx * dx + dy * dy);

        const nuevoX1 = x1 + (dx * this.radio) / distancia;
        const nuevoY1 = y1 + (dy * this.radio) / distancia;
        const nuevoX2 = x2 - (dx * this.radio) / distancia;
        const nuevoY2 = y2 - (dy * this.radio) / distancia;

        ctx.beginPath();
        ctx.moveTo(nuevoX1, nuevoY1);
        ctx.lineTo(nuevoX2, nuevoY2);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 4;
        ctx.stroke();
    
    }

    borrar() {
        
        this.nodo1.borrarUnaArista(this);
        this.nodo2.borrarUnaArista(this);
        this.grafo.borrarUnaArista(this);
        
    }

    tieneNodos(nodo1, nodo2) {
        return  (nodo1 == this.nodo1 || nodo1 == this.nodo2) && 
                (nodo2 == this.nodo1 || nodo2 == this.nodo2); 
    }

}
