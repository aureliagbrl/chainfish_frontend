class Bubble{
    constructor(x, y){
        this.pos_x = x;
        this.pos_y = y;

        this.speed = 0;
        for(var i=0; i < 1000; i++){
            this.target_speed = floor(random(1, 3));
            this.target_size = random(5, 50);
        }

        this.size = 0;

        this.target_x = ceil(random(this.pos_x - 5, this.pos_x + 5));

        this.isOffscreen = false;
    }

    updates(){
        stroke(255);
        noFill();
        ellipse(this.pos_x, this.pos_y, this.size, this.size);
        var arcx = this.pos_x - (this.size / TWO_PI);
        var arcy = this.pos_y - (this.size / TWO_PI) + 1.5;
        arc(arcx, arcy, this.size, this.size, 0, QUARTER_PI);
        this.pos_y -= this.speed;

        if(this.speed > this.target_speed) {
            this.speed -= random(0.05);
        } else if(this.speed < this.target_speed) {
            this.speed += random(0.05);
        }
        
        if(floor(this.pos_x) < this.target_x){
            this.pos_x += random(0.25);
        } else if (floor(this.pos_x) > this.target_x) {
            this.pos_x -= random(0.25);
        } else if (floor(this.pos_x) == this.target_x) {
            this.target_x = ceil(random(this.pos_x - 7, this.pos_x + 7));
        }

        if(this.size <= this.target_size){
            this.size += random(0.2);
        } else {
            this.size += random(0.007);
        }

        if(this.pos_y < -50){
            this.isOffscreen = true;
        }
    }
}

class Bubbles {
    constructor(num_of_bubbles){
        this.bubbles = [];
        this.created = 0;
        this.num = num_of_bubbles;
    }

    updates() {
        if(this.created < this.num){
            if(frameCount % floor(random(60)) == 0){
                this.bubbles.push(new Bubble(random(window.innerWidth-80), window.innerHeight));
                this.created += 1;
            }
        }

        for(var i=0; i < this.bubbles.length; i++){
            this.bubbles[i].updates();
            if(this.bubbles[i].isOffscreen){
                this.bubbles[i] = new Bubble(random(window.innerWidth-80), window.innerHeight);
            }
        }
    }
}

class BubbleBurst {
    constructor(x, y, count){
        this.pos_x = x;
        this.pos_y = y;
        this.bubble_count = count;
        this.bubbles = [];
        this.state = false;
        this.add = true;
        this.isFinished = false;
    }

    updates(){
        if(this.bubbles.length < this.bubble_count && this.state && this.add){
            if(frameCount % 5 == 0){
                this.bubbles.push(new Bubble(this.pos_x, this.pos_y));
                this.count += 1;
            }
        } else if(this.bubbles.length >= this.bubble_count) {
            this.add = false;
        }

        for(var i = 0; i < this.bubbles.length; i++){
            if(this.bubbles[i].isOffscreen){
                this.bubbles.splice(i, 1);
            } else {
                this.bubbles[i].updates();
            }
            //console.log(this.bubbles.length);
        }

        for(var i = 0; i < this.bubbles.length; i++){
            if(this.bubbles[i].isOffscreen){
                this.isFinished = true;
            } else {
                this.isFinished = false;
                break;
            }
        }
    }
}

var b;
var br;
var x = 0;
function setup(){
    createCanvas(window.innerWidth, window.innerHeight);
    frameRate(120);
    ellipseMode(CENTER);
    b = new Bubbles(50);
    br = new BubbleBurst(random(window.innerWidth-80), window.innerHeight, random(20, 100));
}

function draw(){
    createCanvas(window.innerWidth, window.innerHeight);
    x = ceil(random(100));
    background('#4DBFB4');

    if(x == 50 && !br.state){
        br.state = true;
    }

    if(br.isFinished){
        delete br;
        br = null;
        br = new BubbleBurst(random(window.innerWidth-80), window.innerHeight, random(20, 100));
    }
    b.updates();
    br.updates();
}