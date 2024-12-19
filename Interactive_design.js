"use strict";
import context from "../script/context.js";
import { randomNumber } from "../script/utils.js";

// Configuration constants
const SIGNATURE_SIZE = 150; // Base size for the signature grid
const FALLING_X_COUNT = 50; // Number of falling "X" shapes
const FALL_SPEED = 2; // Base falling speed for the "X"
const HOVER_SCALE = 1.5; // Scale factor for hovered squares

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

// Draw the "signature" grid
function drawSignature(size, mouseX, mouseY) {
	const startX = (context.canvas.width - 6 * size) / 2;
	const startY = (context.canvas.height - 5 * size) / 2;

	// Draw grid squares
	for (let row = 0; row < 5; row++) {
		for (let col = 0; col < 6; col++) {
			const squareX = startX + col * size;
			const squareY = startY + row * size;

			// Check if mouse is hovering over the square
			if (
				mouseX >= squareX &&
				mouseX <= squareX + size &&
				mouseY >= squareY &&
				mouseY <= squareY + size
			) {
				context.fillStyle = hsl(
					randomNumber(0, 360),
					100,
					randomNumber(40, 70)
				);
			} else {
				context.fillStyle = "black"; // Default color
			}

			context.fillRect(squareX, squareY, size, size);
		}
	}
}

// Draw the falling "X" shapes
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

// Draw the black and purple grid in the bottom-right corner
function drawBottomRightGrid() {
	const gridSize = 20; // Each block's size
	const gridStartX = context.canvas.width - 5 * gridSize - 10; // Positioning from the right
	const gridStartY = context.canvas.height - 5 * gridSize - 10; // Positioning from the bottom

	const pattern = [
		[0, 0, 0, 0, 0],
		[0, 1, 1, 1, 0],
		[0, 1, 0, 1, 0],
		[0, 1, 1, 1, 0],
		[1, 1, 1, 1, 1],
	];

	for (let row = 0; row < 5; row++) {
		for (let col = 0; col < 5; col++) {
			const color = pattern[row][col] === 1 ? "purple" : "black";
			context.fillStyle = color;
			context.fillRect(
				gridStartX + col * gridSize,
				gridStartY + row * gridSize,
				gridSize,
				gridSize
			);
		}
	}
}

// Animation loop
function animate(mouseX = -1, mouseY = -1) {
	context.clearRect(0, 0, context.canvas.width, context.canvas.height);

	// Draw and update elements
	drawSignature(SIGNATURE_SIZE, mouseX, mouseY);
	drawFallingXs();
	updateFallingXs();
	drawBottomRightGrid(); // Draw the grid in the bottom-right corner

	requestAnimationFrame(() => animate(mouseX, mouseY));
}

// Mouse interaction
context.canvas.addEventListener("mousemove", (e) => {
	const rect = context.canvas.getBoundingClientRect();
	const mouseX = e.clientX - rect.left;
	const mouseY = e.clientY - rect.top;
	animate(mouseX, mouseY);
});

// Initialize and start animation
initFallingXs();
animate();

// Adjust canvas size on window resize
window.addEventListener("resize", () => {
	context.canvas.width = window.innerWidth;
	context.canvas.height = window.innerHeight;
	fallingXs = [];
	initFallingXs();
});
