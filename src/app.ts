import { Observable } from './observable.js';
import { Circle, Line, Rectangle, Renderer, Scene } from './shape.js';
import type { Position } from './types.js';
import { useAnimationFrame } from './use-animation-frame.js';
import { useResizeObserver } from './use-resize-observer.js';
import { assert } from './utils.js';

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
function setup(params: { onResize: () => void }): CanvasRenderingContext2D {
	const root = createDiv('root');
	const canvas = createCanvas('canvas');
	root.appendChild(canvas);
	document.body.appendChild(root);
	canvas.width = 1200;
	canvas.height = 800;
	const context = canvas.getContext('2d');
	assert(context, 'Failed to get context2d');
	const observer = useResizeObserver((size, target) => {
		if (target instanceof HTMLCanvasElement) {
			canvas.width = size.width;
			canvas.height = size.height;
			console.log('Canvas resized', size);
			params.onResize();
		}
	});
	observer.observe(canvas);
	return context;
}
function draw(
	renderer: ReturnType<typeof createRenderer>,
	data: { lines: Line[] },
	delta: number,
) {
	for (const line of data.lines) {
		renderer.line({
			p1: line.source,
			p2: line.target,
			width: line.width,
			colour: line.colour,
		});
	}
	renderer.circle({
		center: { x: 50, y: 50 },
		width: 2,
		radius: 10,
		colour: 'red',
	});
}
export function app() {
	let data: { lines: Line[] } | undefined = undefined;
	const observable = new Observable<{ redraw: boolean }>();
	const context = setup({
		onResize: () => {
			observable.notify({ redraw: true });
		},
	});
	const renderer = createRenderer(context);
	const animation = useAnimationFrame((delta) => {
		console.log('redraw');
		context.clearRect(0, 0, context.canvas.width, context.canvas.height);
		if (data) {
			draw(renderer, data, delta);
		}
		observable.notify({ redraw: false });
	});
	observable.subscribe((data) => {
		if (data.redraw) {
			animation.start();
		} else {
			animation.stop();
		}
	});
	function update(lines: Line[]) {

		data = { lines };
		observable.notify({ redraw: true });
	}
	return {
		update,

	};
}
