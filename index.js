import { Nodo } from './nodo.js';

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

function ajustarTamañoCanvas() {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
}

ajustarTamañoCanvas();
window.addEventListener('resize', ajustarTamañoCanvas);

let nodos = [];
let isDragging = false;
let startX, startY;

canvas.addEventListener('mousedown', (event) => {
    // 0 -> botón izquierdo, 2 -> botón derecho
    if (event.button === 0 || event.button === 2) { 
        startX = event.clientX;
        startY = event.clientY;
        isDragging = false;
    }
});

canvas.addEventListener('mousemove', (event) => {
    if ((event.button === 0 || event.button === 2) && startX !== undefined && startY !== undefined) {
        const dx = event.clientX - startX;
        const dy = event.clientY - startY;

        if (Math.sqrt(dx * dx + dy * dy) > 5) { 
            isDragging = true;
        }
    }
});

canvas.addEventListener('mouseup', (event) => {
    if (event.button === 0 || event.button === 2) {
        if (isDragging) {
            console.log('Arrastre detectado');
        } else {
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            if (event.button === 0) {
                // Botón izquierdo
                const nuevoNodo = new Nodo(x, y);
                nodos.push(nuevoNodo);
            } else {
                // Botón derecho
                nodos = nodos.filter(nodo => !nodo.isAt(x, y));
            }
        }
        startX = undefined;
        startY = undefined;
        isDragging = false;
    }    
});


function draw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    nodos.forEach(nodo => {nodo.draw(ctx)});

    
    window.requestAnimationFrame(draw);

    
}

window.requestAnimationFrame(draw);

