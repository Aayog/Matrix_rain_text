//Single character size
var symbolSize = 30;
var streams = [];
//Nepali letter starting Unicode
var unicode =0x0904;
//Limit is different with Chinese symbols and Nepali symbols
var limit = (unicode == 0x30A0)? 96 : 35;

function setup(){
    createCanvas(window.innerWidth, window.innerHeight);
    textSize(symbolSize);
    var x = 0;
    //initial stream of all signals
    for ( var i = 0; i < width / symbolSize; i++ ){
        var stream = new Stream();
        stream.generateSymbols(x,random(-500,0));
        streams.push(stream);
        x += symbolSize;
    }
}

//Draw calls the render function of each stream every frame
function draw(){
    background(0);
    streams.forEach(function (stream) {
        stream.render();
    })
}

//Symbol class
function Symbol(x, y,speed,first) {
    //position and speed of individual symbol
    this.x = x;
    this.y = y;
    this.value;
    this.speed = speed;
    this.interval = round(random(2,60));
    this.first = first;
    //sets the symbol to random Nepali or Chinese symbols based on the 'unicode' values
    this.setToRandomSymbol = function() {
        if(frameCount % this.interval == 0){
            this.value = String.fromCharCode(
                // 0x0904 + round(random(0,35))
                unicode + round(random(0,limit))
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
    this.speed = random(1,10);

    this.generateSymbols = function(x,y) {
        var first = round(random(0,4)) == 1;
        for (var i = 0; i <= this.totalSymbols; i++){
            symbol = new Symbol(x,y,this.speed,first);
            symbol.setToRandomSymbol();
            this.symbols.push(symbol);
            y -= symbolSize+2;
            first = false;
        }
    }

    this.render = function() {
        this.symbols.forEach( function(symbol) {
            if(symbol.first){
                fill(180,255,180);
            }else{
                fill(0, 255, 70);
            }
            text(symbol.value, symbol.x, symbol.y);
            symbol.rain();
            symbol.setToRandomSymbol();
        });
    }
}
function mousePressed(){
    if(unicode == 0x30A0){
        unicode = 0x0904;
        limit = 35;
    }else{
        unicode = 0x30A0;
        limit = 96;
    }
}
function keyPressed(){
    mousePressed();
}
