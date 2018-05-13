

var canvas = document.querySelector(`#hello`);

if (canvas.getContext) {
   
    var canvasContext = canvas.getContext(`2d`);
    
    } 
    var canvasContext = canvas.getContext(`2d`);
    canvasContext.beginPath();
    canvasContext.moveTo(50, 50);
    canvasContext.lineTo(200, 200);
    canvasContext.lineTo(200, 50);
    canvasContext.lineTo(400, 500);

    canvasContext.fill();
    


