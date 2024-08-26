export class Nodo {
    constructor(x, y, radius = 20, color = 'green') {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    isAt(a, b) {
        return (Math.sqrt((this.x - a)**2 + (this.y - b)**2) <= this.radius);
    }

    resaltar() {
        this.color = 'red';
    }

    noResaltar() {
        this.color = 'green';
    }
}