import { useAnimationFrame } from './use-animation-frame.js';
import { useResizeObserver } from './use-resize-observer.js';

function createDiv(id: string): HTMLDivElement {
	const div = document.createElement('div');
	div.id = id;
	div.style.position = 'absolute';
	div.style.top = '0px';
	div.style.left = '0px';
	div.style.right = '0px';
	div.style.bottom = '0px';
	div.style.margin = '0px';
	div.style.padding = '0px';
	return div;
}
function createCanvas(id: string): HTMLCanvasElement {
	const canvas = document.createElement('canvas');
	canvas.id = id;
	canvas.style.width = '100%';
	canvas.style.height = '100%';
	return canvas;
}

function createRenderer(context: CanvasRenderingContext2D) {
	function line(params: {
		p1: { x: number; y: number };
		p2: { x: number; y: number };
		width: number;
		colour: string;
	}) {
		context.beginPath();
		context.moveTo(params.p1.x, params.p1.y);
		context.lineTo(params.p2.x, params.p2.y);
		context.lineWidth = params.width;
		context.strokeStyle = params.colour;
		context.stroke();
	}
	function circle(params: {
		center: { x: number; y: number };
		width: number;
		radius: number;
		colour: string;
	}) {
		context.beginPath();
		context.arc(
			params.center.x,
			params.center.y,
			params.radius,
			0,
			Math.PI * 2,
		);
		context.lineWidth = params.width;
		context.strokeStyle = params.colour;
		context.stroke();
	}
	return {
		line,
		circle,
	};
}
let lines = [
	{
		p1: { x: 50, y: 50 },
		p2: { x: 200, y: 200 },
		width: 2,
		colour: 'blue',
	},
	{
		p1: { x: 100, y: 100 },
		p2: { x: 200, y: 200 },
		width: 2,
		colour: 'blue',
	},
];
function application() {
	let redraw = false;
	const root = createDiv('root');
	const canvas = createCanvas('canvas');
	root.appendChild(canvas);
	document.body.appendChild(root);

	canvas.width = 1200;
	canvas.height = 800;

	const context = canvas.getContext('2d');
	if (!context) {
		throw new Error('Failed to get context2d');
	}
	const observer = useResizeObserver((size, target) => {
		if (target instanceof HTMLCanvasElement) {
			canvas.width = size.width;
			canvas.height = size.height;
			console.log('Canvas resized', size);
			redraw = true;
		}
	});
	observer.observe(canvas);
	function draw(context: CanvasRenderingContext2D, delta: number) {
		const renderer = createRenderer(context);
		context.clearRect(0, 0, context.canvas.width, context.canvas.height);
		lines = lines.map((item) => {
			return {
				...item,
				p1: {
					x: Math.random() < 0.5 ? item.p1.x + delta : item.p1.x - delta,
					y: Math.random() < 0.5 ? item.p1.y + delta : item.p1.y - delta,
				},
				p2: {
					x: Math.random() < 0.5 ? item.p2.x + delta : item.p2.x - delta,
					y: Math.random() < 0.5 ? item.p2.y + delta : item.p2.y - delta,
				},
				colour: Math.random() < 0.5 ? 'red' : 'green',
			};
		});
		for (const line of lines) {
			renderer.line(line);
		}
		renderer.circle({
			center: { x: 50, y: 50 },
			width: 2,
			radius: 10,
			colour: 'red',
		});
	}
	const animation = useAnimationFrame((delta) => {
		redraw = true;
		if (redraw) {
			console.log('redraw');
			draw(context, delta);
			redraw = false;
		}
	});
	animation.start();
}
document.addEventListener('DOMContentLoaded', application);

// ----------------------
// Main Shape class
class Shape {
	colour: string;
	width: number;
	constructor(params?: { colour?: string; width?: number }) {
		this.colour =
			params?.colour === null || params?.colour === undefined
				? 'black'
				: params.colour; // params.colour ?? 'black';
		this.width = params?.width ? params.width : 2; // params.width || 2;
	}
	draw(ctx: CanvasRenderingContext2D) {}
}

class Line extends Shape {
	x1: number;
	y1: number;
	x2: number;
	y2: number;
	constructor(
		x1: number,
		y1: number,
		x2: number,
		y2: number,
		params?: {
			width?: number;
			colour?: string;
		},
	) {
		super(params);
		this.x1 = x1;
		this.y1 = y1;
		this.x2 = x2;
		this.y2 = y2;
	}

	draw(ctx: CanvasRenderingContext2D) {
		ctx.beginPath();
		ctx.strokeStyle = this.colour;
		ctx.lineWidth = this.width;
		ctx.moveTo(this.x1, this.y1);
		ctx.lineTo(this.x2, this.y2);
		ctx.stroke();
	}
}

class Circle extends Shape {
	x: number;
	y: number;
	radius: number;
	constructor(
		x: number,
		y: number,
		radius: number,
		params?: {
			width?: number;
			colour?: string;
		},
	) {
		super(params);
		this.x = x;
		this.y = y;
		this.radius = radius;
	}

	draw(ctx: CanvasRenderingContext2D) {
		ctx.beginPath();
		ctx.strokeStyle = this.colour;
		ctx.lineWidth = this.width;
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
		ctx.stroke();
	}
}

class Rectangle extends Shape {
	x: number;
	y: number;
	w: number;
	h: number;
	constructor(
		x: number,
		y: number,
		w: number,
		h: number,
		params?: { colour?: string; width?: number },
	) {
		super(params);
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
	}

	draw(ctx: CanvasRenderingContext2D) {
		ctx.beginPath();
		ctx.strokeStyle = this.colour;
		ctx.lineWidth = this.width;
		ctx.strokeRect(this.x, this.y, this.w, this.h);
	}
}

class Scene {
	renderer: Renderer;
	shapes: Shape[];
	constructor(renderer: Renderer) {
		this.renderer = renderer;
		this.shapes = [];
	}

	add(shape: Shape) {
		this.shapes.push(shape);
	}

	draw() {
		this.renderer.clear();
		for (const shape of this.shapes) {
			this.renderer.draw(shape);
		}
	}
}

document.addEventListener('DOMContentLoaded', () => {
	const canvas = document.getElementById('canvas');
	if (!(canvas instanceof HTMLCanvasElement)) {
		throw new Error('Canvas element not found');
	}
	const renderer = new Renderer(canvas);
	const scene = new Scene(renderer);

	scene.add(new Line(50, 50, 200, 200, { colour: 'blue', width: 3 }));
	scene.add(new Circle(300, 150, 40, { colour: 'red' }));
	scene.add(new Rectangle(100, 250, 150, 80, { width: 4 }));

	scene.draw();
});

class Renderer {
	canvas: HTMLElement;
	ctx: CanvasRenderingContext2D;
	constructor(canvas: HTMLCanvasElement) {
		this.canvas = canvas;
		const ctx = canvas.getContext('2d');
		if (!ctx) {
			throw new Error('Failed to get 2D context');
		}
		this.ctx = ctx;
	}
	clear() {
		// this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
	draw(shape: Shape) {
		shape.draw(this.ctx);
	}
}
