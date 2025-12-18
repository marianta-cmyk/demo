import { app } from './app.js';
import { Line } from './shape.js';

document.addEventListener('DOMContentLoaded', () => {
	const instance = app();
	instance.update([
		new Line({
			source: { x: 50, y: 50 },
			target: { x: 200, y: 200 },
			width: 2,
			colour: 'blue',
		}),
		new Line({
			source: { x: 100, y: 100 },
			target: { x: 200, y: 200 },
			width: 2,
			colour: 'blue',
		}),
	]);
});

// document.addEventListener('DOMContentLoaded', () => {
// 	const canvas = document.getElementById('canvas');
// 	if (!(canvas instanceof HTMLCanvasElement)) {
// 		throw new Error('Canvas element not found');
// 	}
// 	const renderer = new Renderer(canvas);
// 	const scene = new Scene(renderer);
// 	scene.add(
// 		new Line({
// 			source: {
// 				x: 50,
// 				y: 50,
// 			},
// 			target: {
// 				x: 200,
// 				y: 200,
// 			},
// 			colour: 'blue',
// 			width: 3,
// 		}),
// 	);
// 	scene.add(
// 		new Circle({
// 			radius: 40,
// 			center: { x: 300, y: 150 },
// 			colour: 'red',
// 		}),
// 	);
// 	scene.add(
// 		new Rectangle({
// 			topleft: { x: 100, y: 250 },
// 			w: 150,
// 			h: 80,
// 			width: 4,
// 		}),
// 	);
// 	scene.draw();
// });
