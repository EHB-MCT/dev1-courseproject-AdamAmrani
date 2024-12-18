"use strict";
import context from "../script/context.js";
import { randomNumber } from "../script/utils.js";

// Configuration constants
const FALLING_X_COUNT = 50; // Number of falling "X" shapes
const FALL_SPEED = 2; // Base falling speed for the "X"

// Array to hold falling "X" shapes
let fallingXs = [];

// Initialize falling "X" shapes
function initFallingXs() {
	for (let i = 0; i < FALLING_X_COUNT; i++) {
		fallingXs.push({
			x: randomNumber(0, context.canvas.width),
			y: randomNumber(-context.canvas.height, 0),
			size: randomNumber(10, 30),
			speed: randomNumber(1, FALL_SPEED),
			color: `rgb(${randomNumber(0, 255)}, ${randomNumber(
				0,
				255
			)}, ${randomNumber(0, 255)})`,
		});
	}
}

// Draw falling "X" shapes
function drawFallingXs() {
	fallingXs.forEach((xShape) => {
		context.strokeStyle = xShape.color;
		context.lineWidth = xShape.size / 10;

		// Draw "X" shape
		context.beginPath();
		context.moveTo(xShape.x - xShape.size / 2, xShape.y - xShape.size / 2);
		context.lineTo(xShape.x + xShape.size / 2, xShape.y + xShape.size / 2);
		context.moveTo(xShape.x + xShape.size / 2, xShape.y - xShape.size / 2);
		context.lineTo(xShape.x - xShape.size / 2, xShape.y + xShape.size / 2);
		context.stroke();
	});
}

// Update falling "X" shapes
function updateFallingXs() {
	fallingXs.forEach((xShape) => {
		// Move the "X" down
		xShape.y += xShape.speed;

		// Reset position when "X" goes out of bounds
		if (xShape.y > context.canvas.height) {
			xShape.y = -xShape.size;
			xShape.x = randomNumber(0, context.canvas.width);
			xShape.size = randomNumber(10, 30);
			xShape.color = `rgb(${randomNumber(0, 255)}, ${randomNumber(
				0,
				255
			)}, ${randomNumber(0, 255)})`;
		}
	});
}

// Animation loop
function animate() {
	context.clearRect(0, 0, context.canvas.width, context.canvas.height);

	// Draw and update elements
	drawFallingXs();
	updateFallingXs();

	requestAnimationFrame(animate);
}

// Initialize and start animation
initFallingXs();
animate();
