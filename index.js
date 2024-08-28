import { Grafo } from './clases/grafo.js';
import { Nodo } from './clases/nodo.js';

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

function ajustarTamañoCanvas() {
    const rect = canvas.getBoundingClientRect();
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
}

ajustarTamañoCanvas();
window.addEventListener('resize', ajustarTamañoCanvas);

let radio = 25;
let grafo = new Grafo(radio);
let isDragging = false;
let startX, startY, mouseX, mouseY;
let agregarNodo, sacarNodo;

canvas.addEventListener('mousedown', (event) => {

    if (event.button === 0) { 
        startX = event.clientX;
        startY = event.clientY;
        isDragging = false;
    }
});

canvas.addEventListener('mousemove', (event) => {
    
    [mouseX, mouseY] = [event.x, event.y];

    if (event.button === 0 && startX !== undefined && startY !== undefined) {
        const dx = event.clientX - startX;
        const dy = event.clientY - startY;

        if (Math.sqrt(dx * dx + dy * dy) > 5) { 
            isDragging = true;
        }
    }
    
});

canvas.addEventListener('mouseup', (event) => {

    if (event.button === 0) {

        if (isDragging) {

            grafo.agregarArista(startX, startY, mouseX, mouseY);
           
        } else {

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
        new Nodo(mouseX, mouseY, radio).draw(ctx, 'lightgreen');
        ctx.globalAlpha = 1.0; 
    }

    if (sacarNodo && mouseX !== undefined && mouseY !== undefined) {
        grafo.resaltarNodoAt(mouseX, mouseY);
    }
    
    window.requestAnimationFrame(draw);

    
}

window.requestAnimationFrame(draw);

