// получите элементы с id 'map', 'progressBar' и 'log' из DOM и поместите их в переменные
// cvs, ctlProgress и logBox соответственно

/* BLOCK 1 */
let cvs = document.getElementById("map");
let ctlProgress = document.getElementById("progressBar");
let logBox = document.getElementById("log");
/* BLOCK 1 END */

var ctx = cvs.getContext('2d');

var gameController = new GameController(cvs);
var lastDirection = -1; //переменная хранит в себе значение текущего направления игрока
var icons = gameController.icons;


// с помощью setTimeout, спустя одну секунду скройте кнопки 'btnStart', 
// 'btnStop' и 'btnCancel', если пользователь не является хостом игры

/* BLOCK 2 */
setTimeout(function(){
    if (!gameController.user.isAdmin){
        document.getElementById("btnStop").style.display = "none";
        document.getElementById("btnCancel").style.display = "none";
    }
}, 1000)
/* BLOCK 2 END */

// создайте функции start(), stop(), reconnect(),
// cancel(), leave(), join(), exit(), которые вызывают соответствующие методы
// объекта gameController

/* BLOCK 3 */
function start() {
    gameController.start();
}
function cancel() {
    gameController.cancel();
}
function disconnect() {
    gameController.disconnect();
}
function reconnect() {
    gameController.reconnect();
}
function leave() {
    gameController.leave();
}
function join() {
    gameController.join();
}
function exit() {
    gameController.exit();
}
/* BLOCK 3 END */

//Moving---------------------------------------------------------------------------

// создайте обработчик события keydown, который вызывает метод gameController.movePlayer(direction)
// и присваивает это направление в lastDirection


/* BLOCK 4 */
document.addEventListener("keydown", function(event) {
    let direction = getDirection(event.keyCode);
    gameController.movePlayer(direction);
    lastDirection = direction;
})
/* BLOCK 4 END */


// с помощью setInterval, каждые 100мс обновляйте текст с игровой статистикой команд
// в элементах ftName, ftScore, ftLifes и stName, stScore, stLifes
// эти данные хранятся в gameController.game.team1Stats и team2Stats

/* BLOCK 5 */
setInterval(function() {
    let 
})
/* BLOCK 5 END */


// напишите функцию displayCell(x, y, width, height, type), которая будет рисовать
// иконку согласно заданному типу. Иконки хранятся в объекте icons, 
// список возможных типов в GameApi.MapCellType

/* BLOCK 6 */
/* BLOCK 6 END */

// присвойте в gameController.displayStatic(map) метод, который будет вызывать displayCell()
// для каждой ячейки, если в ней стена (GameApi.MapCellType.wall)

/* BLOCK 7 */
/* BLOCK 7 END */


// присвойте в gameController.displayDynamic(map) метод, который будет вызывать displayCell()
// для каждой ячейки, если в ней не стена, полицейский или вор

/* BLOCK 8 */
/* BLOCK 8 END */

// присвойте в gameController.displayPlayers(map, players) метод, который будет вызывать drawImage()
// чтобы нарисовать иконки игроков в соответствующих местах

/* BLOCK 9 */
/* BLOCK 9 END */



// присвойте в метод gameController.incrementProgress() функцию, которая
// будет отображать прогресс на элементе ctlProgress

/* BLOCK 10 */
/* BLOCK 10 END */


// присвойте в метод gameController.log(message) функцию, которая
// будет отображать текущее сообщение в элементе logBox

/* BLOCK 11 */
/* BLOCK 11 END */
