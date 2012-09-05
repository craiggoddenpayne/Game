function Game() {
    Game.prototype = this;
    window.craigpayne = {};
    window.craigpayne.game = this;
    return this;
};

Game.prototype.TouchX = -1;
Game.prototype.TouchY = -1;
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
Game.prototype.Scanlines = new Image();

Game.prototype.Settings = {
    ShowFPS: true,
    ViewPort: { Width: window.innerWidth, Height: window.innerHeight},
    XOffset: 0,
    YOffset: 0
};

Game.prototype.Initialise = function () {
    addEventListener("touchstart", function (e) {
        craigpayne.game.TouchX = e.touches[0].pageX;
        craigpayne.game.TouchY = e.touches[0].pageY;
    	e.preventDefault();
    }, false);
    addEventListener("touchmove", function (e) {
        craigpayne.game.TouchX = e.touches[0].pageX;
        craigpayne.game.TouchY = e.touches[0].pageY;
    	e.preventDefault();
    }, false);
    addEventListener("touchend", function (e) {
        craigpayne.game.TouchX = -1;
        craigpayne.game.TouchY = -1;
        e.preventDefault();
    }, false);

    Game.prototype.Scanlines.src = "scanlines.png";
    craigpayne.game.Canvas = document.getElementById("gameCanvas");
    craigpayne.game.Canvas.width = Game.prototype.Settings.ViewPort.Width;
    craigpayne.game.Canvas.height = Game.prototype.Settings.ViewPort.Height;
    craigpayne.game.Context = craigpayne.game.Canvas.getContext("2d");
    craigpayne.game.ship = new Ship();
    
    //game start
    setInterval(craigpayne.game.Tick, 1);
    setInterval(craigpayne.game.Render, 1);
};

Game.prototype.Update = function () {//modifier) {
};

Game.prototype.Render = function () {
    if ((craigpayne.game.RenderLimiterTime + craigpayne.game.RenderLimiterWait) >= new Date().getTime()) {
        return;
    }
    //clear the screen
    craigpayne.game.Context.fillStyle = "black";
    craigpayne.game.Context.fillRect(0, 0, craigpayne.game.Settings.ViewPort.Width, craigpayne.game.Settings.ViewPort.Height);
    
    craigpayne.game.RenderLimiterTime = new Date().getTime();
    craigpayne.game.FPSTicks += 1;
    var now = new Date().getTime();
    if (now > craigpayne.game.FPSTime + 1000) {
        craigpayne.game.FPSTime = now;
        craigpayne.game.FPS = craigpayne.game.FPSTicks;
        craigpayne.game.FPSTicks = 0;
    }

    //Render Objects
    craigpayne.game.ship.Render(craigpayne.game.Context);

    var settings = Game.prototype.Settings;
    if (settings.ShowFPS) {
        craigpayne.game.Context.fillStyle = "white";
        craigpayne.game.Context.font = "bold 10px Arial";
        craigpayne.game.Context.fillText("FPS:" + craigpayne.game.FPS, 10, 10, 600);
        craigpayne.game.Context.fillText("TPS:" + craigpayne.game.TPS, 10, 20, 600);
        craigpayne.game.Context.fillText("TimeCheck:" + craigpayne.game.FPSTime, 10, 30, 600);
        craigpayne.game.Context.fillText("X:" + Game.prototype.TouchX, 10, 40, 600);
        craigpayne.game.Context.fillText("Y:" + Game.prototype.TouchY, 10, 50, 600);
    }

    //context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
    craigpayne.game.Context.drawImage(craigpayne.game.Scanlines, //img	Specifies the image, canvas, or video element to use	 
        0, //sx	Optional. The x coordinate where to start clipping	 
        0, //sy	Optional. The y coordinate where to start clipping	
		craigpayne.game.Scanlines.width, //swidth	Optional. The width of the clipped image	
		craigpayne.game.Scanlines.height, //sheight	Optional. The height of the clipped image	
        0, //x	The x coordinate where to place the image on the canvas	
        0, //y	The y coordinate where to place the image on the canvas	
        craigpayne.game.Settings.ViewPort.Width, //width	Optional. The width of the image to use (stretch or reduce the image)	
        craigpayne.game.Settings.ViewPort.Height//height	Optional. The height of the image to use (stretch or reduce the image)	
    );
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
    
    if(craigpayne.game.TouchY !== -1)
    {
	    if(craigpayne.game.TouchY < Ship.prototype.Y)
			Ship.prototype.Y -= 5;
		else 
			Ship.prototype.Y += 5;
    }
    if(craigpayne.game.TouchX !== -1)
    {
	    if(craigpayne.game.TouchX < Ship.prototype.X)
			Ship.prototype.X -= 5;
		else 
			Ship.prototype.X += 5;
    }

    craigpayne.game.Update();
};