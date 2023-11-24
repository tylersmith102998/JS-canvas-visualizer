// Represents a circular node in the game world.

// import Vector2D
import Vector2D from "../physics/Vector2D.js";

export default class Node {
	// constructor
	constructor(x, y, radius, color, debug = false) {
		// position
		this.position = new Vector2D(x, y);

		// velocity
		this.velocity = new Vector2D(0, 0);

		// acceleration
		this.acceleration = new Vector2D(0, 0);

		// direction
		this.direction = this.velocity.normalize();

		this.target = new Vector2D(1000, 500);
		this.targetRadius = 10;

		this.radius = radius;
		this.color = color;
		this.debug = debug;
	}

	// update
	update() {
		// reset acceleration
		this.acceleration = this.acceleration.multiply(0);

		// simulate gravity around the target
		const G = 0.1;

		// Calculate distance between objects
		const displacement = this.target.subtract(this.position);
		const distance = displacement.magnitude();

		const forceMagnitude = (G * 100000 * 100000) / distance ** 2;
		var force = displacement.normalize().multiply(forceMagnitude);

		// divide force by mass
		force = force.divide(100000);
		console.log(force);

		if (!this.checkCollision(this.target)) {
			// add force to acceleration
			this.acceleration = this.acceleration.add(force);

			// update velocity
			this.velocity = this.velocity.add(this.acceleration);

			// update position
			this.position = this.position.add(this.velocity);

			// update direction
			this.direction = this.velocity.normalize();
		} else {
			var normal = displacement.normalize();
			var relativeVelocity = new Vector2D(0, 0).subtract(this.velocity);

			// calculate impulse
			var impulse = (2 * relativeVelocity.dot(normal)) / (100000 + 100000);

			this.velocity = this.velocity.add(normal.multiply(impulse * 100000));

			// dampening
			this.velocity = this.velocity.multiply(0.5);

			// prevent overlap
			var overlap = this.radius + this.targetRadius - normal.magnitude();
			var separation = normal.multiply(overlap / 2);

			this.position = this.position.subtract(separation);

			// update direction
			this.direction = this.velocity.normalize();
		}
	}

	// check collision with another node
	checkCollision(node) {
		return this.position.distanceTo(node) < this.radius + this.targetRadius;
	}

	// draw
	draw(context) {
		context.beginPath();
		context.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
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
		context.textAlign = "right";
		const canvasWidth = context.canvas.width;

		context.fillText(
			"Position: " +
				this.position.x.toFixed(2) +
				", " +
				this.position.y.toFixed(2),
			canvasWidth - 10,
			20
		);

		context.fillText(
			"Velocity: " +
				this.velocity.x.toFixed(2) +
				", " +
				this.velocity.y.toFixed(2),
			canvasWidth - 10,
			40
		);

		context.fillText(
			"Acceleration: " +
				this.acceleration.x.toFixed(2) +
				", " +
				this.acceleration.y.toFixed(2),
			canvasWidth - 10,
			60
		);

		context.fillText(
			"Direction: " +
				this.direction.x.toFixed(2) +
				", " +
				this.direction.y.toFixed(2),
			canvasWidth - 10,
			80
		);

		// draw target in green
		context.beginPath();
		context.arc(
			this.target.x,
			this.target.y,
			this.targetRadius,
			0,
			2 * Math.PI
		);
		context.fillStyle = "green";
		context.fill();

		// draw direction to target in green and length of 100
		context.beginPath();
		context.moveTo(this.position.x, this.position.y);
		context.lineTo(
			this.position.x + this.direction.x * 100,
			this.position.y + this.direction.y * 100
		);
		context.strokeStyle = "green";
		context.stroke();
	}
}
