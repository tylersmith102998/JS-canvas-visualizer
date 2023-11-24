// import engine
import Engine from "./src/Engine.js";

import Node from "./src/entities/Node.js";
import Vector2D from "./src/physics/Vector2D.js";

// create a new engine
const engine = new Engine(function (engine) {
	// update
	node.update();
	node2.update();

	// update camera
	engine.camera.update(node.position);

	// draw
	node.draw(engine.context);
	node2.draw(engine.context);
});

// create a new node
const node = new Node(engine, 100, 100, 50, "red", true);
const node2 = new Node(engine, 200, 200, 50, "blue", true);

engine.start();
