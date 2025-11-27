// ----------------------

import type { Position } from './types.js';

// Main Shape class
export class Shape {
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

export class Line extends Shape {
	source: Position;
	target: Position;
	constructor(params: {
		source: Position;
		target: Position;
		width?: number;
		colour?: string;
	}) {
		super(params);
		this.source = params.source;
		this.target = params.target;
	}

	draw(ctx: CanvasRenderingContext2D) {
		ctx.beginPath();
		ctx.strokeStyle = this.colour;
		ctx.lineWidth = this.width;
		ctx.moveTo(this.source.x, this.source.y);
		ctx.lineTo(this.target.x, this.target.y);
		ctx.stroke();
	}
}

export class Circle extends Shape {
	radius: number;
	center: Position;
	constructor(params: {
		radius: number;
		center: Position;
		width?: number;
		colour?: string;
	}) {
		super(params);
		this.radius = params.radius;
		this.center = params.center;
	}

	draw(ctx: CanvasRenderingContext2D) {
		ctx.beginPath();
		ctx.strokeStyle = this.colour;
		ctx.lineWidth = this.width;
		ctx.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2);
		ctx.stroke();
	}
}

export class Rectangle extends Shape {
	topleft: Position;
	w: number;
	h: number;
	constructor(params: {
		topleft: Position;
		w: number;
		h: number;
		colour?: string;
		width?: number;
	}) {
		super(params);
		this.topleft = params.topleft;
		this.w = params.w;
		this.h = params.h;
	}

	draw(ctx: CanvasRenderingContext2D) {
		ctx.beginPath();
		ctx.strokeStyle = this.colour;
		ctx.lineWidth = this.width;
		ctx.strokeRect(this.topleft.x, this.topleft.y, this.w, this.h);
	}
}

export class Renderer {
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

export class Scene {
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
