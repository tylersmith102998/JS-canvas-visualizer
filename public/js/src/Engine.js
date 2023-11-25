import FollowCamera from "./FollowCamera.js";

// Custom engine for the game

const defaultOptions = {
	canvas: "canvas",
	width: window.innerWidth,
	height: window.innerHeight,
	backgroundColor: [20, 20, 20, 1],
	FPSTarget: 60,
	showFPS: true,
	debug: false,
};

export default class Engine {
	// constructor
	constructor(options = {}) {
		// merge options with default options
		this.options = Object.assign({}, defaultOptions, options);

		// set the game loop
		this.gameLoop = null;

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
		// request another frame
		window.requestAnimationFrame(this.loop);

		// if enough time has elapsed, draw the next frame
		if (this.fpsElapsed > this.fpsInterval) {
			// Get ready for next frame by setting then=now, but also adjust for your
			// specified fpsInterval not being a multiple of RAF's interval (16.7ms)
			this.fpsThen = this.fpsNow - (this.fpsElapsed % this.fpsInterval);

			// update the game
			this.update(this);

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

			if (this.options.debug) {
				// draw camera center coordinated at bottom left corner
				this.context.fillStyle = "#fff";
				this.context.font = "12px Arial";
				this.context.textAlign = "left";
				this.context.fillText(
					"Camera: " +
						this.camera.position.x.toFixed(2) +
						", " +
						this.camera.position.y.toFixed(2),
					10,
					this.canvas.height - 10
				);
			}
		}

		// calculate the time since last frame
		this.fpsNow = performance.now();
		this.fpsElapsed = this.fpsNow - this.fpsThen;
	}

	// start the engine
	start(update, gameLoop) {
		// set the game loop
		this.gameLoop = gameLoop;
		this.update = update;

		// set FPS target
		this.fpsInterval = 1000 / this.options.FPSTarget;
		this.fpsThen = performance.now();
		this.fpsStartTime = this.fpsThen;

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
