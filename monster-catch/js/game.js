// Create the canvas
let canvas;
let ctx;

canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;


// Background image
let bgReady = false;
let bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/background.png";

// Hero image
let heroReady = false;
let heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "images/hero.png";

// Monster image
let monsterReady = false;
let monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
monsterImage.src = "images/monster.png";

//time
let startTime = Date.now();
const SECONDS_PER_ROUND = 10;
let elapsedTime = 0;
let score = 0;

/* set-up function, button reset game*/
let newGameBtn = document.getElementById("resetBtn");
newGameBtn.addEventListener("click", again);
function again() {
	location.reload();
}

// Game objects
let hero = {
	speed: 256 // movement in pixels per second
};
let monster = {};
let monstersCaught = 0;
let monsterX = 70;
let monsterY = 100;
let monsterSpeed = 5;
let monsterDirection = 1;
let monsterDirectionY = 1;

// Handle keyboard controls
let keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

// Reset the game when the player catches a monster
let reset = function () {
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;


	// Throw the monster somewhere on the screen randomly
	monster.x = 32 + (Math.random() * (canvas.width - 64));
	monster.y = 32 + (Math.random() * (canvas.height - 64));


};



// Update game objects
let update = function (modifier) {
	// Update the time.
	elapsedTime = Math.floor((Date.now() - startTime) / 1000);


	if (38 in keysDown) { // Player holding up
		hero.y -= hero.speed * modifier;
	}
	if (40 in keysDown) { // Player holding down
		hero.y += hero.speed * modifier;
	}
	if (37 in keysDown) { // Player holding left
		hero.x -= hero.speed * modifier;
	}
	if (39 in keysDown) { // Player holding right
		hero.x += hero.speed * modifier;
	}


	// Are they touching?
	if (

		hero.x <= (monster.x + 32)
		&& monster.x <= (hero.x + 32)
		&& hero.y <= (monster.y + 32)
		&& monster.y <= (hero.y + 32)
	) {
		++monstersCaught;
		reset();
	}
	if (hero.x >= canvas.width - 64) {
		hero.x = 0;
	}
	if (hero.x < 0) {
		hero.x = canvas.width - 64;
	}

	if (hero.y >= canvas.height - 64) {
		hero.y = 0;
	}
	if (hero.y < 0) {
		hero.y = canvas.height - 64
	}
};

// Draw everything
let render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}

	if (monsterReady) {
		ctx.drawImage(monsterImage, monster.x, monster.y);
	}
	const isGameOver = SECONDS_PER_ROUND - elapsedTime < 0;

	if (isGameOver) {
		ctx.font = "20px Georgia";
		ctx.fillStyle = "black";
		ctx.fillRect(180, 200, 150, 100);
		ctx.fillStyle = "#FF0000";
		ctx.fillText("Game Over!", 200, 250);
		reload()

	} else {
		document.getElementById("remaining-time").innerHTML = `${SECONDS_PER_ROUND - elapsedTime}`;
		// ctx.fillText(`Seconds Remaining: ${SECONDS_PER_ROUND - elapsedTime}`, 20, 100);
	}
	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	// ctx.fillText("Goblins caught: " + monstersCaught, 32, 32);
	document.getElementById("total-score").innerHTML = `${+ monstersCaught}`;
};

// The main game loop
let main = function () {
	let now = Date.now();
	let delta = now - then;

	update(delta / 1000);
	render();

	then = now;




	// Request to do this again ASAP
	requestAnimationFrame(main);
};


// Cross-browser support for requestAnimationFrame
let w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

let then = Date.now();
reset();
main();
