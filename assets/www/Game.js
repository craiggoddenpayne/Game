function Game() {
    Game.prototype = this;
    window.craigpayne = {};
    window.craigpayne.game = this;
    return this;
};

Game.prototype.keysDown = {};
Game.prototype.Canvas = null;
Game.prototype.Context = null;
Game.prototype.FPS = 0;
Game.prototype.FPSTicks = 0;
Game.prototype.FPSTime = new Date().getTime();
Game.prototype.TPS = 0;
Game.prototype.TPSTicks = 0;
Game.prototype.TPSTime = new Date().getTime();

Game.prototype.TickLimiterTime = new Date().getTime();
Game.prototype.TickLimiterWait = 25;
Game.prototype.RenderLimiterTime = new Date().getTime();
Game.prototype.RenderLimiterWait = 50;
Game.prototype.DebugString = "";

Game.prototype.Settings = {
    ShowFPS: true,
    ViewPort: function () {
        return { Width: window.innerWidth, Height: window.innerHeight};
    },
    XOffset: 0,
    YOffset: 0
};

Game.prototype.Initialise = function () {
    addEventListener("keydown", function (e) {
        craigpayne.game.keysDown[e.keyCode] = true;
    }, false);
    addEventListener("mousemove", function(e) {
        craigpayne.game.DebugString =
            "X:" + (e.clientX - craigpayne.game.Settings.XOffset) +
                "Y:" + e.clientY;
    }, false);
    craigpayne.game.Canvas = document.getElementById("gameCanvas");
    craigpayne.game.Canvas.width = Game.prototype.Settings.ViewPort().Width;
    craigpayne.game.Canvas.height = Game.prototype.Settings.ViewPort().Height;
    craigpayne.game.Context = craigpayne.game.Canvas.getContext("2d");
    setInterval(craigpayne.game.Tick, 1);
    setInterval(craigpayne.game.Render, 1);
};

Game.prototype.Update = function () {//modifier) {
    if (38 in craigpayne.game.keysDown) { // Player holding up
    }
    if (40 in craigpayne.game.keysDown) { // Player holding down
    }
    if (37 in craigpayne.game.keysDown) { // Player holding left    
        craigpayne.ball.Left();
    }
    if (39 in craigpayne.game.keysDown) { // Player holding right
        craigpayne.ball.Right();
    }
};

Game.prototype.Render = function () {
    if ((craigpayne.game.RenderLimiterTime + craigpayne.game.RenderLimiterWait) >= new Date().getTime()) {
        return;
    }

    craigpayne.game.RenderLimiterTime = new Date().getTime();
    craigpayne.game.FPSTicks += 1;
    var now = new Date().getTime();
    if (now > craigpayne.game.FPSTime + 1000) {
        craigpayne.game.FPSTime = now;
        craigpayne.game.FPS = craigpayne.game.FPSTicks;
        craigpayne.game.FPSTicks = 0;
    }

    var settings = Game.prototype.Settings;
    if (settings.ShowFPS) {

        craigpayne.game.Context.fillStyle = "white";
        craigpayne.game.Context.fillRect(0,0,640,480);
        craigpayne.game.Context.fillStyle = "black";
        craigpayne.game.Context.font = "bold 10px Arial";
        craigpayne.game.Context.fillText("FPS:" + craigpayne.game.FPS, 10, 10, 600);
        craigpayne.game.Context.fillText("TPS:" + craigpayne.game.TPS, 10, 20, 600);
        craigpayne.game.Context.fillText("TimeCheck:" + craigpayne.game.FPSTime, 10, 30, 600);
        craigpayne.game.Context.fillText("XOffset:" + Game.prototype.Settings.XOffset, 10, 70, 600);
        craigpayne.game.Context.fillText("YOffset:" + Game.prototype.Settings.YOffset, 10, 80, 600);
    }
};

Game.prototype.Tick = function () {
    if ((craigpayne.game.TickLimiterTime + craigpayne.game.TickLimiterWait) >= new Date().getTime()) {
        return;
    }
    craigpayne.game.TickLimiterTime = new Date().getTime();
    var settings = Game.prototype.Settings;
    craigpayne.game.TPSTicks += 1;
    var now = new Date().getTime();
    if (now > craigpayne.game.TPSTime + 1000) {
        craigpayne.game.TPSTime = now;
        craigpayne.game.TPS = craigpayne.game.TPSTicks;
        craigpayne.game.TPSTicks = 0;
    }
    craigpayne.game.Update();
};