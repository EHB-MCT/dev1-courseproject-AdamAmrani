"use strict";

function signature(size = 50) {
	const canvas = document.getElementById("avatarCanvas");
	const ctx = canvas.getContext("2d");

	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	const pattern = [
		[0, 0, 0, 0, 0, 0],
		[0, 0, 1, 1, 1, 0],
		[0, 0, 1, 0, 1, 0],
		[0, 0, 1, 1, 1, 0],
		[0, 1, 1, 1, 1, 1],
	];

	ctx.fillStyle = "purple";

	for (let row = 0; row < pattern.length; row++) {
		for (let col = 0; col < pattern[row].length; col++) {
			if (pattern[row][col] === 1) {
				ctx.fillRect(col * size, row * size, size, size);
			}
		}
	}
}

signature(50);
