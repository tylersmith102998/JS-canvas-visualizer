// imports
import Vector2D from "../physics/Vector2D.js";

// Tracer particle class

export default class Tracer {
	// constructor
	constructor(engine, x, y, width, color, debug = false) {
		// set engine
		this.engine = engine;

		// position
		this.position = new Vector2D(x, y);

		// opacity
		this.opacity = 1;

		// width
		this.width = width;

		// color
		this.color = color;

		// debug
		this.debug = debug;
	}

	// update
	update() {
		// update opacity
		this.opacity *= 1;

		// slowly shrink width
		this.width *= 0.9;
	}

	// draw tracers as a line
	draw(lastPosition) {
		this.lastPosition = lastPosition;

		// if tracer is off screen with respect to camera, return
		if (
			this.engine.camera.getOffsetX(this.position.x) +
				this.width +
				Math.abs(this.position.x - lastPosition.x) <
				0 ||
			this.engine.camera.getOffsetX(this.position.x) -
				this.width -
				Math.abs(lastPosition.x - this.position.x) >
				this.engine.canvas.width ||
			this.engine.camera.getOffsetY(this.position.y) +
				this.width +
				Math.abs(this.position.y - lastPosition.y) <
				0 ||
			this.engine.camera.getOffsetY(this.position.y) -
				this.width -
				Math.abs(lastPosition.y - this.position.y) >
				this.engine.canvas.height
		) {
			//console.log("off screen");

			return;
		}

		// if tracer width is less than 0.01, return
		if (this.width < 0.01) {
			return;
		}

		// set opacity
		this.engine.context.globalAlpha = this.opacity;

		// set stroke style
		this.engine.context.strokeStyle = this.color;

		// set line width
		this.engine.context.lineWidth = this.width;

		// begin path
		this.engine.context.beginPath();

		// move to current position
		this.engine.context.moveTo(
			this.engine.camera.getOffsetX(this.position.x),
			this.engine.camera.getOffsetY(this.position.y)
		);

		// line to next position
		this.engine.context.lineTo(
			this.engine.camera.getOffsetX(lastPosition.x),
			this.engine.camera.getOffsetY(lastPosition.y)
		);

		// stroke
		this.engine.context.stroke();

		// reset opacity
		this.engine.context.globalAlpha = 1;

		if (this.debug) {
			// draw position
			this.drawDebug();
		}
	}

	drawDebug() {
		// draw hollow red box around tracer
		this.engine.context.strokeStyle = "red";
		this.engine.context.lineWidth = 1;
		this.engine.context.strokeRect(
			this.engine.camera.getOffsetX(this.position.x),
			this.engine.camera.getOffsetY(this.position.y),
			this.engine.camera.getOffsetX(this.lastPosition.x) -
				this.engine.camera.getOffsetX(this.position.x),
			this.engine.camera.getOffsetY(this.lastPosition.y) -
				this.engine.camera.getOffsetY(this.position.y)
		);
	}
}
