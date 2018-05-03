
var symbolSize = 20;
var streams = [];

function setup(){
    createCanvas(window.innerWidth, window.innerHeight);
    textSize(symbolSize);
    var x = 0;
    for ( var i = 0; i < width / symbolSize; i++ ){
        var stream = new Stream();
        stream.generateSymbols(x,random(-500,0));
        streams.push(stream);
        x += symbolSize;
    }
}

function draw(){
    background(0,150);
    streams.forEach(function (stream) {
        stream.render();
    })
}

function Symbol(x, y,speed) {
    this.x = x;
    this.y = y;
    this.value;
    this.speed = speed;
    this.interval = round(random(2,40));

    this.setToRandomSymbol = function() {
        if(frameCount % this.interval == 0){
            this.value = String.fromCharCode(
                0x0900 + round(random(0, 128))
            );
        }
    }
    this.rain = function(){
        this.y = (this.y >= height)? 0 : this.y += this.speed;
    }
}

function Stream() {
    this.symbols = [];
    this.totalSymbols = round(random(5,30));
    this.speed = random(1,15);
    this.generateSymbols = function(x,y) {
        for (var i = 0; i <= this.totalSymbols; i++){
            symbol = new Symbol(x,y,this.speed);
            symbol.setToRandomSymbol();
            this.symbols.push(symbol);
            y -= symbolSize+2;
        }
    }

    this.render = function() {
        this.symbols.forEach( function(symbol) {
            fill(0, 255, 70);
            text(symbol.value, symbol.x, symbol.y);
            symbol.rain();
            symbol.setToRandomSymbol();
        });
    }
}
