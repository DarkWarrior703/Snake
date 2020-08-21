//Variables
let x = 150, y = 150;
let vx = 0, vy = 0;
let inter = -1;
let running = 1;
let fx = 100, fy = 100;
let size = 10;
let score = 0;
let tail = [[x + size, y + size]];

//Onload tag
window.onload = function () {
    gen_fruit();
    inter = setInterval(game, 1000 / 15);
}

//Main game loop
function game() {
    if (running) {
        const canvas = document.querySelector('canvas');
        const ctx = canvas.getContext('2d');
        let pre = [x, y];
        let pre2;
        for (let i = 0; i < tail.length; i++) {
            pre2 = tail[i];
            tail[i] = pre;
            pre = pre2;
        }
        x += vx * size;
        y += vy * size;
        if (x >= canvas.width) {
            x = 0;
        }
        else if (x <= -size) {
            x = canvas.width - size;
        }
        if (y >= canvas.height) {
            y = 0;
        }
        else if (y <= -size) {
            y = canvas.height - size;
        }
        if (x == fx && y == fy) {
            score++;
            gen_fruit();
            tail.push([tail[tail.length - 1] - size, tail[tail.length - 1] - size]);
        }
        ctx.fillStyle = 'Black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#00FF00';
        ctx.fillRect(x, y, size, size);
        ctx.fillStyle = 'Red';
        ctx.fillRect(fx, fy, size, size);
        for (let i = 0; i < tail.length; i++) {
            ctx.fillStyle = 'Green';
            ctx.fillRect(tail[i][0], tail[i][1], size, size);
        }
        for (let i = 2; i < tail.length; i++) {
            if (tail[i][0] == x && tail[i][1] == y) running = 0;
        }
        document.querySelector('div').innerHTML = "<h1> Your score is " + score.toString() + ".</h1>";
    }
    else {
        clearInterval(inter);
        //Display "Game Over"
        document.querySelector('div').innerHTML = "<h1> Your score was " + score.toString() + ".</h1> <p> See you next time! </p><button onclick='restart()' class='button'>Try again?</button>";
    }
}

//Checking for key pressing
document.addEventListener("keypress", key);
function key(e) {
    //If OP pressed q, quit the game
    if (e.key == 'q') running = 0;
    //If vx is 0, we can move along vx.
    if (vx == 0) {
        if (e.key == 'a') vx = -1, vy = 0;
        else if (e.key == 'd') vx = 1, vy = 0;
    }
    //If vy is 0, we can move along vy.
    if (vy == 0) {
        if (e.key == 'w') vy = -1, vx = 0;
        else if (e.key == 's') vy = 1, vx = 0;
    }
}

//Generating random fruit coords
function gen_fruit() {
    fx = Math.floor(Math.random() * 10) * 30;
    fy = Math.floor(Math.random() * 10) * 30;
}

//Restart the game
function restart() {
    gen_fruit();
    x = 150;
    y = 150;
    running = 1;
    vx = 0, vy = 0;
    score = 0;
    tail = [];
    inter = setInterval(game, 1000 / 15);
}