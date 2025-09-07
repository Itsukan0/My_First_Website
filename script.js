window.onload = function () {
    var canvas;
    var canvasWidth = 900;
    var canvasHeight = 600;
    var blockSize = 30;
    var ctx;
    var delay = 100;
    var snakey;
    var applee;
    var score;

    init();

    function init() {
        canvas = document.createElement('canvas');
        canvas.style.display = "block";
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        canvas.style.border = "30px solid gray";
        canvas.style.margin = "50px auto";
        canvas.style.backgroundColor = "#ddd"
        document.body.appendChild(canvas)
        ctx = canvas.getContext('2d');
        widthInBlocks = canvasWidth/blockSize;
        heightInBlocks = canvasHeight/blockSize;
        snakey = new Snake([[6, 4], [5, 4], [4, 4]], "right")
        applee = new Apple([10, 10]);
        score = 0;
        refreshCanvas();
    };

    function refreshCanvas() {
        snakey.advance();
        if(snakey.checkCollision()){
            gameOver();
        }
        else{
            if(snakey.isEatingApple(applee)){
                score++;
                snakey.ateApple = true;
                do{
                    applee.setNewPosition();
                }
                while(applee.isOnSnake(snakey))
            }
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            snakey.draw();
            applee.draw();
            drawScore();
            setTimeout(refreshCanvas, delay);
        }
    };

    function gameOver(){
        ctx.save();
        ctx.font = "bold 70px sans-serif";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.strokeStyle = "white";
        ctx.lineWidth = 5;
        var centerX = canvasWidth/2;
        var centerY = canvasHeight/2;
        ctx.textBaseline = "middle";
        ctx.strokeText("Game Over", centerX, centerY - 180);
        ctx.fillText("Game Over", centerX, centerY - 180);

        ctx.font = "bold 30px sans-serif";
        ctx.strokeText("Press the Space button to replay", centerX, centerY - 120);
        ctx.fillText("Press the Space button to replay", centerX, centerY - 120);
        ctx.restore();
    }

    function restart(){
        snakey = new Snake([[6, 4], [5, 4], [4, 4]], "right")
        applee = new Apple([10, 10]);
        score = 0;
        refreshCanvas();
    }

    function drawScore(){
        ctx.save();
        ctx.font = "bold 200px sans-serif";
        ctx.fillStyle = "gray";
        ctx.textAlign = "center";
        var centerX = canvasWidth/2;
        var centerY = canvasHeight/2;
        ctx.textBaseline = "middle";
        ctx.fillText(score.toString(), centerX, centerY);
        ctx.restore();
    }

    function drawBlock(ctx, position) {
        var x = position[0] * blockSize;
        var y = position[1] * blockSize;
        ctx.fillRect(x, y, blockSize, blockSize);
    };

    function Snake(body, direction) {
        this.body = body;
        this.direction = direction;
        this.ateApple = false;
        this.draw = function () {
            ctx.save();
            ctx.fillStyle = "#ff0000";
            for (var i = 0; i < this.body.length; i++) {
                drawBlock(ctx, this.body[i])
            };
            ctx.restore();
        };

        this.advance = function () {
            var nextPosition = this.body[0].slice();
            switch (this.direction) {
                case "left":
                    nextPosition[0] -= 1;
                    break;
                case "right":
                    nextPosition[0] += 1;
                    break;
                case "up":
                    nextPosition[1] -= 1;
                    break;
                case "down":
                    nextPosition[1] += 1;
                    break;
                default:
                    throw("Invalid Direction");
            }
            this.body.unshift(nextPosition);
            if(!this.ateApple){
                this.body.pop();
            }
            else{
                this.ateApple = false;
            }
        };

        this.setDirection = function (newDirection) {
            var allowedDirections;
            switch (this.direction) {
                case "left":
                case "right":
                    allowedDirections = ["up", "down"];
                    break;
                case "up":
                case "down":
                    allowedDirections = ["left", "right"];
                    break;
                default:
                    throw("Invalid Direction");
            };
            if (allowedDirections.indexOf(newDirection) > -1){
                this.direction = newDirection;
            }
        };

        this.checkCollision = function(){
            var wallCollision = false;
            var snakeCollision = false;
            var head = this.body[0];
            var rest = this.body.slice(1);
            var snakeX = head[0];
            var snakeY = head[1];
            var minX = 0;
            var minY = 0;
            var maxX = widthInBlocks - 1;
            var maxY = heightInBlocks - 1;

            var isNotBetweenHorizontalWalls = snakeX < minX || snakeX > maxX;
            var isNotBetweenVerticalWalls = snakeY < minY || snakeY > maxY;

            if(isNotBetweenHorizontalWalls || isNotBetweenVerticalWalls){
                wallCollision = true;
            }

            for(var i = 0; i< rest.length; i++){
                if(snakeX===rest[i][0] && snakeY===rest[i][1]){
                    snakeCollision = true;
                }
            }

            return wallCollision || snakeCollision;
        };

        this.isEatingApple = function(appletoEat){
            var head = this.body[0];
            if (head[0] == appletoEat.position[0] && head[1] == appletoEat.position[1]){
                return true
            }
            else{
                return false
            }
        };
    };
    
    function Apple(position) {
        this.position = position;
        this.draw = function(){
            ctx.save();
            ctx.fillStyle = "#33cc33";
            ctx.beginPath();
            var radius = blockSize/2;
            var x = this.position[0]*blockSize + radius;
            var y = this.position[1]*blockSize + radius;
            ctx.arc(x, y, radius, 0, Math.PI*2, true);
            ctx.fill()
            ctx.restore();
        }
    
        this.setNewPosition = function(){
            var newX = Math.round(Math.random() * (widthInBlocks - 1));
            var newY = Math.round(Math.random() * (heightInBlocks - 1));
            this.position = [newX, newY];
        }

        this.isOnSnake = function(snakeToCheck){
            var isOnSnake = false;

            for (var i = 0;  i < snakeToCheck.body.length; i++){
                if(this.position[0]=== snakeToCheck.body[i][0] && this.position[1]=== snakeToCheck.body[i][1]){
                    isOnSnake = true;
                }
            }

            return isOnSnake;
        }
    }

    document.onkeydown = function handleKeydown(e) {
        var key = e.keyCode;
        var newDirection;
        switch (key) {
            case 32:
                restart();
                return;
            case 37:
                newDirection = "left";
                break;
            case 38:
                newDirection = "up";
                break;
            case 39:
                newDirection = "right";
                break;
            case 40:
                newDirection = "down";
                break;
                default:
                    return;
        }
        snakey.setDirection(newDirection);
    };
};

