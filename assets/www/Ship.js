function Ship(){
}

Ship.prototype.X = 100;
Ship.prototype.Y = 100;



Ship.prototype.Render = function (context) {
    context.fillStyle = "lime";
    context.fillRect(Ship.prototype.X, Ship.prototype.Y, 20, 20);
}

Ship.prototype.Tick = function(){
};