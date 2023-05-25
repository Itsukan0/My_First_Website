console.log("Shapes and Loops Execercise")

DrawLine = function(){
    var canvas = document.getElementById('line');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        // code de dessin dans le canvas
        if (ctx) {
            console.log("Got the context !")
        }
        else{
            console.log("Error : coudn't fetch canvas 2d context")
        }
      }
}

DrawSquare = function (){
    var canvas = document.getElementById('square');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        // code de dessin dans le canvas
        console.log("Got the context !")
      }
      else{
        console.log("Error : coudn't fetch canvas 2d context")
    }
}

DrawTriangle = function (){
    var canvas = document.getElementById('triangle');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        // code de dessin dans le canvas
        console.log("Got the context !")
    }
    else{
        console.log("Error : coudn't fetch canvas 2d context")
    }
}

Draw = function(){
    DrawLine();
    DrawSquare();
    DrawTriangle();
}