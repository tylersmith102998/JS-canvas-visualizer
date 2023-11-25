// import engine
import Engine from "./src/Engine.js";

import Node from "./src/entities/Node.js";
import Vector2D from "./src/physics/Vector2D.js";

var debug = false;
//var debug = true;

// create a new engine
const engine = new Engine({ FPSTarget: 60 });

// create a new node
//const node = new Node(engine, 50, 100, 10, "red", debug);
//const node2 = new Node(engine, 22870, -50000, 10, "blue", debug);

// array of nodes
const nodes = [];

// create 10 nodes with random coords from -1000 to 1000
for (let i = 0; i < 10; i++) {
	nodes.push(
		new Node(
			engine,
			Math.random() * 2000 - 1000,
			Math.random() * 2000 - 1000,
			10,
			"red",
			debug
		)
	);
}

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
				node1.repulse(node2, 500);
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
	const randomNode = nodes[Math.floor(Math.random() * nodes.length)];

	// update radius
	//randomNode.radius = Math.random() * 20 + 10;

	// update camera
	engine.camera.update(nodes[0].position);
	//engine.camera.update(
	//	new Vector2D(engine.canvas.width / 2, engine.canvas.height / 2)
	//);
}

function draw(engine) {
	// draw nodes
	nodes.forEach((node) => {
		node.draw(engine.context);
	});
}

engine.start(update, draw);
