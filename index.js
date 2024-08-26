import { Grafo } from './clases/grafo.js';
import { Nodo } from './clases/nodo.js';

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

function ajustarTamañoCanvas() {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
}

ajustarTamañoCanvas();
window.addEventListener('resize', ajustarTamañoCanvas);

let grafo = new Grafo;
let isDragging = false;
let startX, startY, mouseX, mouseY;
let agregarNodo, sacarNodo;
let rect;

function obtenerCoordenadas(event) {
    const rect = canvas.getBoundingClientRect();
    mouseX = event.clientX - rect.left;
    mouseY = event.clientY - rect.top;
}

canvas.addEventListener('mousedown', (event) => {

    obtenerCoordenadas(event);

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
    if (agregarNodo || sacarNodo) 
        obtenerCoordenadas(event);
    
});

canvas.addEventListener('mouseup', (event) => {
    if (event.button === 0 || event.button === 2) {
        if (isDragging) {
            console.log('Arrastre detectado');
        } else {
            obtenerCoordenadas(event);

            if (event.button === 0) {

                if(agregarNodo) {
                    grafo.agregarNodoAt(mouseX, mouseY);
                    agregarNodo = false;
                }

                else if(sacarNodo) {
                    if(grafo.sacarNodoAt(mouseX, mouseY)) 
                        sacarNodo = false;

                }
            }
        }
        startX = undefined;
        startY = undefined;
        isDragging = false;
    }    
});

document.getElementById("agregarNodo").addEventListener("click", () => {
    agregarNodo = true;
    sacarNodo = false;
});

document.getElementById("sacarNodo").addEventListener("click", () => {
    sacarNodo = true;
    agregarNodo = false;
});

function draw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    grafo.draw(ctx);

    if (agregarNodo && mouseX !== undefined && mouseY !== undefined) {
        ctx.globalAlpha = 0.5; 
        new Nodo(mouseX, mouseY).draw(ctx, 'lightgreen');
        ctx.globalAlpha = 1.0; 
    }

    if (sacarNodo && mouseX !== undefined && mouseY !== undefined) {
        grafo.resaltarNodoAt(mouseX, mouseY);
    }
    
    window.requestAnimationFrame(draw);

    
}

window.requestAnimationFrame(draw);

