// получите элементы с id 'map', 'progressBar' и 'log' из DOM и поместите их в переменные
// cvs, ctlProgress и logBox соответственно

/* BLOCK 1 */

var cvs = document.getElementById("map");
var ctlProgress = document.getElementById("progressBar");
var logBox = document.getElementById("log");

/* BLOCK 1 END */

var ctx = cvs.getContext('2d');

var gameController = new GameController(cvs);
var lastDirection = -1; //переменная хранит в себе значение текущего направления игрока
var icons = gameController.icons;


// с помощью setTimeout, спустя одну секунду скройте кнопки 'btnStart', 
// 'btnStop' и 'btnCancel', если пользователь не является хостом игры

/* BLOCK 2 */

setTimeout(function () {
    let userId = gameController.user.id;
    let ownerId = gameController.game.owner.id;

    if (userId != ownerId) {
         document.getElementById("btnStart").style.display = "none";
         document.getElementById("btnStop").style.display = "none";
         document.getElementById("btnCancel").style.display = "none";
    }
}, 1000);

/* BLOCK 2 END */

// создайте функции start(), stop(), reconnect(),
// cancel(), leave(), join(), exit(), которые вызывают соответствующие методы
// объекта gameController

/* BLOCK 3 */
function start() {
    gameController.start();
}

function stop() {
    gameController.stop();
}

function reconnect() {
    gameController.reconnect();
}

function cancel() {
    gameController.cancel();
}

function leave() {
    gameController.leave();
}

function join() {
    gameController.join();
}

function exit() {
    gameController.disconnect();
    jsHelper.setNewPageUrl('index.html');
}

/* BLOCK 3 END */

//Moving---------------------------------------------------------------------------

// создайте обработчик события keydown, который вызывает метод gameController.movePlayer(direction)
// и присваивает это направление в lastDirection


/* BLOCK 4 */

document.onkeydown = function (keyEvent) {
    switch (keyEvent.key) {
        case 'ц':
        case 'w':
            gameController.movePlayer(0);
            lastDirection = 0;
            break;

        case 'ф':
        case 'a':
            gameController.movePlayer(1);
            lastDirection = 1;
            break;

        case 'ы':
        case 's':
            gameController.movePlayer(3);
            lastDirection = 3;
            break;

        case 'в':
        case 'd':
            gameController.movePlayer(2);
            lastDirection = 2;
            break;

    }
};

/* BLOCK 4 END */


// с помощью setInterval, каждые 100мс обновляйте текст с игровой статистикой команд
// в элементах ftName, ftScore, ftLifes и stName, stScore, stLifes
// эти данные хранятся в gameController.game.team1Stats и team2Stats

/* BLOCK 5 */
var showScore = setInterval(function () {
    if (gameController.game != null) {
        refreshScoreData(gameController.game.team1Stats, gameController.game.team2Stats);
    }
}, 100);

function refreshScoreData(team1, team2) {
    if (team1) {
        document.getElementById('nameFirstTeam').innerText = "Название: " + team1.name;
        document.getElementById('scoreFirstTeam').innerText = "Очки: " + team1.coinsCollected || 0;
        document.getElementById('lifesFirstTeam').innerText = "Жизни: " + team1.currentLives;
    }

    if (team2) {
        document.getElementById('nameSecondTeam').innerText = "Название: " +  team2.name;
        document.getElementById('scoreSecondTeam').innerText = "Очки: " + team2.coinsCollected || 0;
        document.getElementById('lifesSecondTeam').innerText = "Жизни: " + team2.currentLives || 0;
    }
};

/* BLOCK 5 END */


// напишите функцию displayCell(x, y, width, height, type), которая будет рисовать
// иконку согласно заданному типу. Иконки хранятся в объекте icons, 
// список возможных типов в GameApi.MapCellType

/* BLOCK 6 */


function displayCell(x, y, width, height, type) {
    var x = x * width;
    var y = y * height;

    var img = defineCellType(type);
    if (img != null) {
        ctx.drawImage(img, x, y, width, height);
    }


    function defineCellType(type) {
        switch (type) {
            case GameApi.MapCellType.empty:
            default:
                return icons.empty || null;
            case GameApi.MapCellType.wall:
                return icons.wall || null;
            case GameApi.MapCellType.coin:
                return icons.coin || null;
            case GameApi.MapCellType.life:
                return icons.life || null;
            case GameApi.MapCellType.swtch:
                return icons.switch || null;
            case GameApi.MapCellType.thiefRespawn:
                return icons.empty || null;
            case GameApi.MapCellType.policeRespawn:
                return icons.empty || null;
            case 7:
                return icons.police || null;
            case 8:
                return icons.thief || null;
        }
    };
}

/* BLOCK 6 END */

// присвойте в gameController.displayStatic(map) метод, который будет вызывать displayCell()
// для каждой ячейки, если в ней стена (GameApi.MapCellType.wall)

/* BLOCK 7 */

gameController.displayStatic = function (map) {
    var blockSizeX = cvs.clientWidth / map.width;
    var blockSizeY = cvs.clientHeight / map.height;

    if (map) {
        for (var i = 0; i < map.cells.length; i++) {
            var cell = map.cells[i];
            if (cell === GameApi.MapCellType.wall) {
                var x = parseInt(i / map.height);
                var y = i - x * map.height;
                displayCell(x, y, blockSizeX, blockSizeY, cell);
            }
        }
    }
};


/* BLOCK 7 END */


// присвойте в gameController.displayDynamic(map) метод, который будет вызывать displayCell()
// для каждой ячейки, если в ней не стена, полицейский или вор

/* BLOCK 8 */

gameController.displayDynamic = function (map) {
    var blockSizeX = cvs.clientWidth / map.width;
    var blockSizeY = cvs.clientHeight / map.height;

    if (map) {
        for (var i = 0; i < map.cells.length; i++) {
            var cell = map.cells[i];
            if (cell !== GameApi.MapCellType.wall && cell !== GameApi.MapCellType.thief && cell !== GameApi.MapCellType.police) {
                var x = parseInt(i / map.height);
                var y = i - x * map.height;
                displayCell(x, y, blockSizeX, blockSizeY, cell);
            }
        }
    }
};

/* BLOCK 8 END */

// присвойте в gameController.displayPlayers(map, players) метод, который будет вызывать drawImage()
// чтобы нарисовать иконки игроков в соответствующих местах

/* BLOCK 9 */

gameController.displayPlayers = function (map, players) {
    var blockSizeX = cvs.clientWidth / map.width;
    var blockSizeY = cvs.clientHeight / map.height;

   
    for (var i = 0; i < players.length; i++) {
        var p = players[i];
        var x = p.location.x * blockSizeX;
        var y = p.location.y * blockSizeY;
        ctx.drawImage(p.icon, x, y, blockSizeX, blockSizeY)
    }
};

/* BLOCK 9 END */



// присвойте в метод gameController.incrementProgress() функцию, которая
// будет отображать прогресс на элементе ctlProgress

/* BLOCK 10 */


gameController.incrementProgress = function incrementProgress() {
    var percent = gameController.remainingSwitchTime * 100 / gameController.game.switchTimeout + '%';
    ctlProgress.style.width = percent;
    gameController.remainingSwitchTime += 100;
};

/* BLOCK 10 END */


// присвойте в метод gameController.log(message) функцию, которая
// будет отображать текущее сообщение в элементе logBox

/* BLOCK 11 */


gameController.log = function log(message) {
    if (message) {
        document.getElementById('log').innerHTML += message + "<br>";
    }
};

/* BLOCK 11 END */
