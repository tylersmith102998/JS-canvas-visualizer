import Vector2D from "./physics/Vector2D.js";

export default class FollowCamera {
	// constructor
	constructor(context) {
		this.position = new Vector2D(0, 0);
		this.target = new Vector2D(0, 0);
		this.context = context;
	}

	update(position) {
		// update to center of screen based on position. set to new vector2d
		this.target = new Vector2D(
			this.context.canvas.width / 2 - position.x,
			this.context.canvas.height / 2 - position.y
		);

		if (this.target.x != this.position.x || this.target.y != this.position.y) {
			this.position = this.position.add(
				this.target.subtract(this.position).multiply(0.1)
			);
		}
	}

	// get offsetX from x coordinate
	getOffsetX(x) {
		return x + this.position.x;
	}

	// get offsetY from y coordinate
	getOffsetY(y) {
		return y + this.position.y;
	}
}
