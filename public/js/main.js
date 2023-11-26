// import engine
import Engine from "./src/Engine.js";

import Node from "./src/entities/Node.js";
import Vector2D from "./src/physics/Vector2D.js";

var debug = false;
//var debug = true;

// create a new engine
const engine = new Engine({
	FPSTarget: 60,
	backgroundColor: [1, 1, 15, 1],
	debug: debug,
});

// create a new node
//const node = new Node(engine, 50, 100, 10, "red", debug);
//const node2 = new Node(engine, 22870, -50000, 10, "blue", debug);

// array of nodes
const nodes = [];

// create 1 node
nodes.push(new Node(engine, 0, 0, 5, "red", debug));

let medianX = 0;
let medianY = 0;

// create 1 node every 5 seconds
setInterval(() => {
	if (nodes.length >= 100) {
		return;
	}

	// get random r, g, b values
	var r = Math.floor(Math.random() * 255);
	var g = Math.floor(Math.random() * 255);
	var b = Math.floor(Math.random() * 255);

	//r = 0;
	g = 0;
	//b = 0;

	// random radius between 5 and 30
	const radius = Math.random() * (10 - 1) + 1;

	// random positions
	const x = medianX + Math.random() * 1000 - 500;
	const y = medianY + Math.random() * 1000 - 500;

	nodes.push(new Node(engine, x, y, radius, `rgb(${r}, ${g}, ${b})`, debug));

	// remove nodes if there are too many
	if (nodes.length > 500) {
		nodes.splice(1, 1);
	}
}, 50);

// update canvas size on window resize
window.addEventListener("resize", () => {
	engine.canvas.width = window.innerWidth;
	engine.canvas.height = window.innerHeight;
});

function update(engine) {
	// repel nodes from each other
	nodes.forEach((node1) => {
		nodes.forEach((node2) => {
			if (node1 !== node2) {
				node1.repulse(node2, 1000);
			}
		});
	});

	// attract nodes to each other
	nodes.forEach((node1) => {
		nodes.forEach((node2) => {
			if (node1 !== node2) {
				node1.attract(node2, 550);
			}
		});
	});

	//console.log(node2.position);

	// give random acceleration to node between -.1 and .1
	//node.acceleration = node.acceleration.add(
	//	new Vector2D(Math.random() * 0.2 - 0.1, Math.random() * 0.2 - 0.1)
	//);

	// update nodes
	nodes.forEach((node) => {
		node.update();
	});

	// get a random node
	const randomNode =
		nodes[Math.floor(Math.random() * Math.floor(nodes.length))];

	// multiply radius by random number between 0.9 and 1.1
	//randomNode.radius *= Math.random() * 0.2 + 0.9;

	// if radius is less than 1, set to 1
	if (randomNode.radius < 1) {
		randomNode.radius = 1;
	} else if (randomNode.radius > 30) {
		randomNode.radius = 30;
	}

	// get median x and y

	nodes.forEach((node) => {
		medianX += node.position.x;
		medianY += node.position.y;
	});
	medianX /= nodes.length;
	medianY /= nodes.length;

	// update camera
	engine.camera.update(nodes[0].position);
	//engine.camera.update(nodes[nodes.length - 1].position);
	//engine.camera.update(new Vector2D(medianX, medianY));
	//engine.camera.update(
	//	new Vector2D(engine.canvas.width / 2, engine.canvas.height / 2)
	//);

	nodes.forEach((node) => {
		if (Math.random() < 0.005) {
			node.velocity = node.velocity.multiply(Math.random() * (4 - 1.1) + 1.1);
			if (node.velocity.magnitude() > 50) {
				node.velocity = node.velocity.normalize().multiply(50);
			}
		}
	});
}

function draw(engine) {
	// draw nodes
	nodes.forEach((node) => {
		node.draw(engine.context);
	});

	// debug
	if (true) {
		// draw median x and y
		engine.context.fillStyle = "white";
		engine.context.font = "12px Arial";
		engine.context.textAlign = "left";

		// get total node count on screen
		let nodeCount = 0;
		nodes.forEach((node) => {
			if (
				engine.camera.getOffsetX(node.position.x) + node.radius > 0 &&
				engine.camera.getOffsetX(node.position.x) - node.radius <
					engine.canvas.width &&
				engine.camera.getOffsetY(node.position.y) + node.radius > 0 &&
				engine.camera.getOffsetY(node.position.y) - node.radius <
					engine.canvas.height
			) {
				nodeCount++;
			}
		});

		// get tracer count from each node
		var tracerCount = 0;
		nodes.forEach((node) => {
			if (
				engine.camera.getOffsetX(node.position.x) + node.radius > 0 &&
				engine.camera.getOffsetX(node.position.x) - node.radius <
					engine.canvas.width &&
				engine.camera.getOffsetY(node.position.y) + node.radius > 0 &&
				engine.camera.getOffsetY(node.position.y) - node.radius <
					engine.canvas.height
			) {
				node.tracerPositions.forEach((tracer) => {
					if (
						engine.camera.getOffsetX(tracer.position.x) > 0 &&
						engine.camera.getOffsetX(tracer.position.x) < engine.canvas.width &&
						engine.camera.getOffsetY(tracer.position.y) > 0 &&
						engine.camera.getOffsetY(tracer.position.y) < engine.canvas.height
					) {
						tracerCount++;
					}
				});
			}
		});

		engine.context.fillText("Node Count: " + nodeCount, 10, 40);

		engine.context.fillText("Tracer Count: " + tracerCount, 10, 60);
	}
}

engine.start(update, draw);
