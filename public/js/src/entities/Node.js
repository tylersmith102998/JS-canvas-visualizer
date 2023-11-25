// Represents a circular node in the game world.

// import Vector2D
import Vector2D from "../physics/Vector2D.js";

export default class Node {
	// constructor
	constructor(engine, x, y, radius, color, debug = false) {
		// set engine
		this.engine = engine;

		// keep track of tracer positions
		this.tracerPositions = [];

		// position
		this.position = new Vector2D(x, y);

		// velocity
		this.velocity = new Vector2D(0, 0);

		// acceleration
		this.acceleration = new Vector2D(0, 0);

		// direction
		this.direction = this.velocity.normalize();

		this.radius = radius;
		this.color = color;
		this.debug = debug;
	}

	// Repulse another node
	repulse(node, maxDistance) {
		var distance = Math.floor(this.position.distanceTo(node.position));

		// add both radii to distance
		distance += this.radius + node.radius;

		// if distance is less than maxDistance, repel
		if (distance < maxDistance) {
			const direction = this.position.directionTo(node.position);

			// force gets exponentially stronger as distance gets smaller (inverse square law)
			const force = direction.multiply(1 / (distance * 0.1));
			//console.log("Repel force: " + force.x + ", " + force.y);
			node.acceleration = node.acceleration.add(force);
		}
	}

	// Attract another node
	attract(node, minDistance) {
		var distance = Math.floor(this.position.distanceTo(node.position));

		// add both radii to distance
		distance += this.radius + node.radius;

		// if distance is greater than maxDistance, attract
		if (distance > minDistance) {
			const direction = this.position.directionTo(node.position);

			// force gets exponentially stronger as distance gets larger
			const force = direction.multiply(distance * 0.0003);
			//console.log("Attract force: " + force.x + ", " + force.y);
			node.acceleration = node.acceleration.subtract(force);
		}
	}

	// update
	update() {
		// apply max acceleration
		if (this.acceleration.magnitude() > 0.2) {
			this.acceleration = this.acceleration.normalize().multiply(0.2);
		}

		// update velocity
		this.velocity = this.velocity.add(this.acceleration).multiply(0.98);

		// if velocity is less than 0.1, set to 0
		if (this.velocity.magnitude() < 0.001) {
			this.velocity = new Vector2D(0, 0);
		}

		// update position
		this.position = this.position.add(this.velocity);

		// update direction
		this.direction = this.velocity.normalize();

		// reset acceleration
		this.acceleration = new Vector2D(0, 0);

		// add current position to tracerPositions
		this.tracerPositions.push(this.position);

		// if tracerPositions is longer than 100, remove first element
		if (this.tracerPositions.length > 100) {
			this.tracerPositions.shift();
		}
	}

	// draw
	draw(context) {
		context.beginPath();
		context.arc(
			this.engine.camera.getOffsetX(this.position.x),
			this.engine.camera.getOffsetY(this.position.y),
			this.radius,
			0,
			2 * Math.PI
		);
		context.fillStyle = this.color;
		context.fill();
		context.closePath();

		// draw debug
		if (this.debug) {
			this.drawDebug(context);
		}
	}

	// draw debug at top right corner
	// show position, velocity, acceleration, and direction
	drawDebug(context) {
		context.font = "12px Arial";
		context.fillStyle = "white";
		context.textAlign = "justify";
		const canvasWidth = context.canvas.width;

		context.fillText(
			"Position: " +
				this.position.x.toFixed(2) +
				", " +
				this.position.y.toFixed(2),
			this.engine.camera.getOffsetX(this.position.x),
			this.engine.camera.getOffsetY(this.position.y + this.radius + 20)
		);

		context.fillText(
			"Velocity: " +
				this.velocity.x.toFixed(2) +
				", " +
				this.velocity.y.toFixed(2),
			this.engine.camera.getOffsetX(this.position.x),
			this.engine.camera.getOffsetY(this.position.y + this.radius + 40)
		);

		context.fillText(
			"Direction: " +
				this.direction.x.toFixed(2) +
				", " +
				this.direction.y.toFixed(2),
			this.engine.camera.getOffsetX(this.position.x),
			this.engine.camera.getOffsetY(this.position.y + this.radius + 60)
		);

		// draw direction to target in green and length of 100
		context.beginPath();
		context.moveTo(
			this.engine.camera.getOffsetX(this.position.x),
			this.engine.camera.getOffsetY(this.position.y)
		);
		context.lineTo(
			this.engine.camera.getOffsetX(this.position.x + this.direction.x * 100),
			this.engine.camera.getOffsetY(this.position.y + this.direction.y * 100)
		);
		context.strokeStyle = "green";
		context.stroke();
	}
}
