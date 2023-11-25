// import engine
import Engine from "./src/Engine.js";

import Node from "./src/entities/Node.js";
import Vector2D from "./src/physics/Vector2D.js";

// create a new engine
const engine = new Engine();

// create a new node
const node = new Node(engine, 50, 100, 10, "red", true);
const node2 = new Node(engine, 22870, 100, 10, "blue", true);

// update canvas size on window resize
window.addEventListener("resize", () => {
	engine.canvas.width = window.innerWidth;
	engine.canvas.height = window.innerHeight;
});

engine.start(function (engine) {
	// make nodes repel each other
	const distance = Math.floor(node.position.distanceTo(node2.position));

	// if distance is less than 300, repel
	if (distance < 200) {
		const direction = node.position.directionTo(node2.position);
		//const force = direction.multiply(distance * 0.001);
		// force gets exponentially stronger as distance gets smaller (inverse square law)
		const force = direction.multiply(1 / (distance * 0.1));
		console.log("Repel force: " + force.x + ", " + force.y);
		//node.acceleration = node.acceleration.subtract(force);
		node2.acceleration = node2.acceleration.add(force);
	}

	// if distance is greater than 300, attract
	if (distance > 250) {
		const direction = node.position.directionTo(node2.position);
		// force gets exponentially stronger as distance gets larger
		const force = direction.multiply(distance * 0.0003);
		console.log("Attract force: " + force.x + ", " + force.y);
		//node.acceleration = node.acceleration.add(force);
		node2.acceleration = node2.acceleration.subtract(force);
	}

	//console.log(node2.position);

	// give random acceleration to node between -.1 and .1
	//node.acceleration = node.acceleration.add(
	//	new Vector2D(Math.random() * 0.2 - 0.1, Math.random() * 0.2 - 0.1)
	//);

	// update
	node.update();
	node2.update();

	// update camera
	engine.camera.update(node2.position);
	//engine.camera.update(
	//	new Vector2D(engine.canvas.width / 2, engine.canvas.height / 2)
	//);

	// draw
	node.draw(engine.context);
	node2.draw(engine.context);
});
