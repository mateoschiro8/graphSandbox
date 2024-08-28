export class Nodo {
    constructor(x, y, radio, color = '#62f5dc') {
        this.x = x;
        this.y = y;
        this.radio = radio;
        this.color = color;
        this.colors = [color, 'red'];
        this.aristas = [];
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radio, 0, Math.PI * 2);
        
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 8; 
        ctx.stroke();

        ctx.fillStyle = this.color;
        ctx.fill();

    }

    agregarArista(arista) {
        this.aristas.push(arista);
    }

    borrarAristas() {
        this.aristas.forEach(arista => {
            arista.borrar();
        });
    }

    borrarUnaArista(arista) {
        this.aristas = this.aristas.filter(a => a !== arista);
    }

    isAt(a, b) {
        return (Math.sqrt((this.x - a)**2 + (this.y - b)**2) <= this.radio);
    }

    resaltar() {
        this.color = this.colors[1];
        
    }

    noResaltar() {
        this.color = this.colors[0];
    }
}