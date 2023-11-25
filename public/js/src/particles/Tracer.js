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
}
