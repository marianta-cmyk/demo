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
function draw(context: CanvasRenderingContext2D) {
	const renderer = createRenderer(context);
	renderer.line({
		p1: { x: 50, y: 50 },
		p2: { x: 200, y: 200 },
		width: 2,
		colour: 'blue',
	});
	renderer.circle({
		center: { x: 50, y: 50 },
		width: 2,
		radius: 10,
		colour: 'red',
	});
}
function application() {
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
			draw(context);
		}
	});
	observer.observe(canvas);
	draw(context);
}
document.addEventListener('DOMContentLoaded', application);
