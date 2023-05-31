var player = document.getElementById("carroRojo");
        var computer = document.getElementById("carroAmarillo");
        var game = document.getElementById("game");
        var goal = document.getElementById("goal");
        var obstacles = [];

        var playerInitialTop = 280;
        var playerInitialLeft = 380;
        var computerInitialTop = 280;
        var computerInitialLeft = 20;
        var isPaused = false;

        function moveUp(element) {
            var topPosition = parseInt(window.getComputedStyle(element).getPropertyValue("top"));
            if (topPosition > 0) {
                element.style.top = (topPosition - 10) + "px";
            }
        }

        function moveDown(element) {
            var topPosition = parseInt(window.getComputedStyle(element).getPropertyValue("top"));
            if (topPosition < 560) {
                element.style.top = (topPosition + 10) + "px";
            }
        }

        function moveLeft(element) {
            var leftPosition = parseInt(window.getComputedStyle(element).getPropertyValue("left"));
            if (leftPosition > 0) {
                element.style.left = (leftPosition - 10) + "px";
            }
        }

        function moveRight(element) {
            var leftPosition = parseInt(window.getComputedStyle(element).getPropertyValue("left"));
            if (leftPosition < 760) {
                element.style.left = (leftPosition + 10) + "px";
            }
        }

        function createObstacle() {
            var obstacle = document.createElement("div");
            obstacle.classList.add("obstacle");
            obstacle.style.left = Math.random() * 760 + "px";

            var azules = document.createElement("img");
            azules.src=("assets/car.png");

            obstacle.style.backgroundColor=randomColor();

            obstacle.appendChild(azules);
            game.appendChild(obstacle);
            obstacles.push(obstacle);
        }

        function moveObstacles() {
            if (!isPaused) {
                for (var i = 0; i < obstacles.length; i++) {
                    var obstacle = obstacles[i];
                    var topPosition = parseInt(window.getComputedStyle(obstacle).getPropertyValue("top"));
                    if (topPosition > 600) {
                        obstacle.style.display = "none";
                        obstacles.splice(i, 1);
                    } else {
                        obstacle.style.top = (topPosition + 5) + "px";
                    }
                }
            }
        }

        function checkCollision() {
            var playerRect = player.getBoundingClientRect();
            var computerRect = computer.getBoundingClientRect();
            var goalRect = goal.getBoundingClientRect();

            for (var i = 0; i < obstacles.length; i++) {
                var obstacle = obstacles[i];
                var obstacleRect = obstacle.getBoundingClientRect();

                if (
                    playerRect.top < obstacleRect.bottom &&
                    playerRect.bottom > obstacleRect.top &&
                    playerRect.left < obstacleRect.right &&
                    playerRect.right > obstacleRect.left
                ) {
                    alert("Has perdido. ¡Inténtalo de nuevo!");
                    resetGame();
                }

                if (
                    computerRect.top < obstacleRect.bottom &&
                    computerRect.bottom > obstacleRect.top &&
                    computerRect.left < obstacleRect.right &&
                    computerRect.right > obstacleRect.left
                ) {
                    alert("Has ganado. ¡Felicidades!");
                    resetGame();
                }
            }

            if (
                playerRect.top < goalRect.bottom &&
                playerRect.bottom > goalRect.top &&
                playerRect.left < goalRect.right &&
                playerRect.right > goalRect.left
            ) {
                alert("Has ganado. ¡Felicidades!");
                resetGame();
            }
        }

        function resetGame() {
            player.style.top = playerInitialTop + "px";
            player.style.left = playerInitialLeft + "px";
            computer.style.top = computerInitialTop + "px";
            computer.style.left = computerInitialLeft + "px";

            for (var i = 0; i < obstacles.length; i++) {
                obstacles[i].remove();
            }
            obstacles = [];
        }

        setInterval(moveObstacles, 30);
        setInterval(createObstacle, 1500);
        setInterval(moveComputer, 500);

        function moveComputer() {
            if (!isPaused) {
                var randomDirection = Math.floor(Math.random() * 4);
                switch (randomDirection) {
                    case 0:
                        moveUp(computer);
                        break;
                    case 1:
                        moveDown(computer);
                        break;
                    case 2:
                        moveLeft(computer);
                        break;
                    case 3:
                        moveRight(computer);
                        break;
                }
            }
        }

        document.addEventListener("keydown", function (event) {
            if (!isPaused) {
                if (event.key === "ArrowUp") {
                    moveUp(player);
                } else if (event.key === "ArrowDown") {
                    moveDown(player);
                } else if (event.key === "ArrowLeft") {
                    moveLeft(player);
                } else if (event.key === "ArrowRight") {
                    moveRight(player);
                }
            }
        });

        document.getElementById("pause").addEventListener("click", function () {
            if (!isPaused) {
                isPaused = true;
                this.innerText = "Continuar";
            } else {
                isPaused = false;
                this.innerText = "Pausa";
            }
        });

        setInterval(checkCollision, 10);

        
        function randomColor(){
            function c(){
                let hex=Math.floor(Math.random()*256).toString(16);
                return ("0"+String(hex)).substr(-2);
            }
            return "#"+c()+c()+c();
        }
