import FollowCamera from "./FollowCamera.js";

// Custom engine for the game

const defaultOptions = {
	canvas: "canvas",
	width: window.innerWidth,
	height: window.innerHeight,
	backgroundColor: "#111",
	showFPS: true,
};

export default class Engine {
	// constructor
	constructor(gameLoop, options = {}) {
		// merge options with default options
		this.options = Object.assign({}, defaultOptions, options);

		// set the game loop
		this.gameLoop = gameLoop;

		// check if backgroundColor is array, and if so, convert it to rgba
		if (Array.isArray(this.options.backgroundColor)) {
			this.options.backgroundColor =
				"rgba(" + this.options.backgroundColor.join(",") + ")";
		}

		console.log(this.options);

		// get the canvas
		this.canvas = document.getElementById(this.options.canvas);

		// get the context
		this.context = this.canvas.getContext("2d");

		// set canvas width and height to window size
		this.canvas.width = this.options.width;
		this.canvas.height = this.options.height;

		// scale the canvas using css transform
		//const scaleX = window.innerWidth / this.canvas.width;
		//const scaleY = window.innerHeight / this.canvas.height;

		//const scaleToFit = Math.min(scaleX, scaleY);
		//const scaleToCover = Math.max(scaleX, scaleY);

		//this.canvas.style.transformOrigin = "0 0";
		//this.canvas.style.transform = "scale(" + scaleToFit + ")";

		this.times = [];
		this.fps = 0;

		// set up the camera
		this.camera = new FollowCamera(this.context);
	}

	// game loop
	loop() {
		// clear the canvas
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

		// set background color to slightly lighter than black
		this.context.fillStyle = this.options.backgroundColor;
		this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

		this.gameLoop(this);

		// output camera position to console
		//console.log(this.camera.position);

		// calculate the fps and display it if showFPS is true
		this.calculateFPS();
		if (this.options.showFPS) {
			this.context.fillStyle = "#fff";
			this.context.font = "12px Arial";
			this.context.textAlign = "left";
			this.context.fillText("FPS: " + this.fps, 10, 20);
		}

		// draw the next frame
		window.requestAnimationFrame(this.loop);
	}

	// start the engine
	start() {
		// start the game loop
		this.loop = this.loop.bind(this);
		this.loop();
	}

	// calculate the fps
	calculateFPS() {
		var now = performance.now();
		while (this.times.length > 0 && this.times[0] <= now - 1000) {
			this.times.shift();
		}
		this.times.push(now);
		this.fps = this.times.length;
	}
}
