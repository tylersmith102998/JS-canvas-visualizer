// import engine
import Engine from "./src/Engine.js";

import Node from "./src/entities/Node.js";
import Vector2D from "./src/physics/Vector2D.js";

// create a new engine
const engine = new Engine(function (engine) {
	// make nodes repel each other
	const distance = node.position.distanceTo(node2.position);

	// if distance is less than 300, repel
	if (distance < 300) {
		const direction = node.position.directionTo(node2.position);
		const force = direction.multiply(10 / distance);
		node.acceleration = node.acceleration.subtract(force);
		node2.acceleration = node2.acceleration.add(force);
	}

	console.log(distance);

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
const node = new Node(engine, 100, 100, 10, "red", true);
const node2 = new Node(engine, 200, 90, 10, "blue", true);

// update canvas size on window resize
window.addEventListener("resize", () => {
	engine.canvas.width = window.innerWidth;
	engine.canvas.height = window.innerHeight;
});

engine.start();
