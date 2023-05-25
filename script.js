console.log("Shapes and Loops Execercise")

DrawShape = function(pointsArray, canvasID, fill = false){
    console.log("Drawing a line !")
    if (!pointsArray && !extCanvas_id){
        console.error("Args are invalid !")
        return false
    }

    id = canvasID
    var canvas = document.getElementById(id);

    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        // code de dessin dans le canvas
        if (ctx) {
            let i = 0;
            beginPoint = pointsArray[0]

            ctx.beginPath();
            ctx.moveTo(beginPoint[0], beginPoint[1]);
            while (i < (pointsArray.length-1)){
                beginPoint = pointsArray[i];
                stopPoint = pointsArray[i+1];
                ctx.lineTo(stopPoint[0], stopPoint[1]);
                console.log("Drew Line from : (" + beginPoint.join() + ") to ("+  stopPoint.join()+")")
                i++;
            }
            if (fill){
                console.log("We fill the Path !")
                ctx.fill();
            }
            ctx.closePath();
            ctx.stroke();
            return true
        }
        else{
            console.log("Error : coudn't fetch canvas 2d context")
        }
      }
    return false
}


Draw = function(){
    // Line
    if (!DrawShape([[50,50],[100,100]],'line')){
        console.error("Coudn't Draw Line !")
        return
    }
    else{
        console.log("Sucessfull Drawing of Line !")
    }
    // Square
    // We could also use ctx.rect but I suppose it's not what is asked here, too simple
    if (!DrawShape([[10,10], [10,100], [100,100], [100,10], [10,10]],'square', true)){
        console.error("Coudn't Draw Square !")
        return
    }
    else{
        console.log("Sucessfull Drawing of Square !")
    }
    if (!DrawShape([[10,10], [10,100], [100,100], [10,10]],'triangle', false)){
        console.error("Coudn't Draw Triangle !")
        return
    }
    else{
        console.log("Sucessfull Drawing of Triangle !")
    }
    return
}