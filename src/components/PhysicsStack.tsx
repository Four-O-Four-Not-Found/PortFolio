import { useEffect, useRef } from "react";
import Matter from "matter-js";

const TECH_STACK = [
	"React",
	"Node.js",
	".NET",
	"TypeScript",
	"FastAPI",
	"PostgreSQL",
	"Three.js",
	"Framer Motion",
	"Docker",
	"AWS",
	"Flutter",
	"Python",
];

const PhysicsStack = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		if (!containerRef.current || !canvasRef.current) return;

		const {
			Engine,
			Render,
			Runner,
			Bodies,
			Composite,
			Mouse,
			MouseConstraint,
		} = Matter;

		const width = containerRef.current.clientWidth;
		const height = containerRef.current.clientHeight;

		const engine = Engine.create();
		const world = engine.world;

		const render = Render.create({
			element: containerRef.current,
			engine: engine,
			canvas: canvasRef.current,
			options: {
				width,
				height,
				background: "transparent",
				wireframes: false,
			},
		});

		const ground = Bodies.rectangle(width / 2, height + 10, width, 20, {
			isStatic: true,
		});
		const leftWall = Bodies.rectangle(-10, height / 2, 20, height, {
			isStatic: true,
		});
		const rightWall = Bodies.rectangle(width + 10, height / 2, 20, height, {
			isStatic: true,
		});
		const ceiling = Bodies.rectangle(width / 2, -10, width, 20, {
			isStatic: true,
		});

		Composite.add(world, [ground, leftWall, rightWall, ceiling]);

		const stackItems = TECH_STACK.map((tech, i) => {
			const x = Math.random() * width;
			const y = -100 - i * 50;

			const body = Bodies.rectangle(x, y, tech.length * 12 + 20, 40, {
				chamfer: { radius: 20 },
				render: {
					fillStyle: "transparent",
					strokeStyle: "#0084ff",
					lineWidth: 1,
				},
			});

			// We'll overlay the text in the render loop or just use the matter-js canvas to draw text
			return body;
		});

		Composite.add(world, stackItems);

		const mouse = Mouse.create(render.canvas);
		const mouseConstraint = MouseConstraint.create(engine, {
			mouse: mouse,
			constraint: {
				stiffness: 0.2,
				render: { visible: false },
			},
		});

		Composite.add(world, mouseConstraint);

		const runner = Runner.create();
		Runner.run(runner, engine);
		Render.run(render);

		// Custom drawing for text
		Matter.Events.on(render, "afterRender", () => {
			const context = render.context;
			context.font = "14px Inter";
			context.fillStyle = "#0084ff";
			context.textAlign = "center";
			context.textBaseline = "middle";

			stackItems.forEach((body, i) => {
				const { x, y } = body.position;
				const angle = body.angle;
				context.save();
				context.translate(x, y);
				context.rotate(angle);
				context.fillText(TECH_STACK[i], 0, 0);
				context.restore();
			});
		});

		return () => {
			Render.stop(render);
			Runner.stop(runner);
			Engine.clear(engine);
		};
	}, []);

	return (
		<div
			ref={containerRef}
			className="physics-container"
			style={{
				width: "100%",
				height: "400px",
				position: "relative",
				touchAction: "none",
			}}
		>
			<canvas ref={canvasRef} />
		</div>
	);
};

export default PhysicsStack;
