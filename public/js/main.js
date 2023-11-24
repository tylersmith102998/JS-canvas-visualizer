// import engine
import Engine from "./src/Engine.js";
import Camera from "./src/Camera.js";

import Node from "./src/entities/Node.js";
import Vector2D from "./src/physics/Vector2D.js";

// create a new node
const node = new Node(100, 100, 50, "red", true);

// create a new engine
const engine = new Engine(function (engine) {
	// update
	node.update();

	// draw
	node.draw(engine.context);
});

engine.start();
