"use strict";
import context from "../script/context.js";
import { hsl, randomNumber } from "../script/utils.js";

// Configuration constants
const SIGNATURE_SIZE = 150; // Base size for the signature grid
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
			targetSize: randomNumber(10, 50), // Target size for animation
			sizeChangeSpeed: randomNumber(0.05, 0.2), // Speed at which size changes
		});
	}
}

// Draw the "signature" grid
function drawSignature(size) {
	const startX = (context.canvas.width - 6 * size) / 2;
	const startY = (context.canvas.height - 5 * size) / 2;

	// Draw grid squares
	for (let row = 0; row < 5; row++) {
		for (let col = 0; col < 6; col++) {
			const squareX = startX + col * size;
			const squareY = startY + row * size;

			context.fillStyle = "black"; // Default color
			context.fillRect(squareX, squareY, size, size);
		}
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

// Update falling "X" shapes and animate their size
function updateFallingXs() {
	fallingXs.forEach((xShape) => {
		// Move the "X" down
		xShape.y += xShape.speed;

		// Animate the size of the "X"
		if (xShape.size < xShape.targetSize) {
			xShape.size += xShape.sizeChangeSpeed; // Increase size towards target size
		} else if (xShape.size > xShape.targetSize) {
			xShape.size -= xShape.sizeChangeSpeed; // Decrease size towards target size
		}

		// Reset position when "X" goes out of bounds
		if (xShape.y > context.canvas.height) {
			xShape.y = -xShape.size; // Reset to top of canvas
			xShape.x = randomNumber(0, context.canvas.width); // Random horizontal position
			xShape.targetSize = randomNumber(10, 50); // New target size for animation
			xShape.sizeChangeSpeed = randomNumber(0.05, 0.2); // Random speed for size change
			xShape.color = `rgb(${randomNumber(0, 255)}, ${randomNumber(
				0,
				255
			)}, ${randomNumber(0, 255)})`; // Random color
		}
	});
}

// Animation loop
function animate() {
	context.clearRect(0, 0, context.canvas.width, context.canvas.height);

	// Draw the grid and falling "X" shapes
	drawSignature(SIGNATURE_SIZE);
	drawFallingXs();
	updateFallingXs(); // Update the falling positions of Xs and animate their size

	requestAnimationFrame(animate); // Request the next frame for animation
}

// Initialize and start animation
initFallingXs();
animate();
