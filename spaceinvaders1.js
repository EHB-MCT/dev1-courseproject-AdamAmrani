"use strict";

function signature(size = 50) {
	const canvas = document.getElementById("avatarCanvas");
	const ctx = canvas.getContext("2d");

	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	ctx.fillStyle = "purple";

	ctx.fillRect(2 * size, 1 * size, size, size);
	ctx.fillRect(3 * size, 1 * size, size, size);
	ctx.fillRect(4 * size, 1 * size, size, size);

	ctx.fillRect(2 * size, 2 * size, size, size);
	ctx.fillRect(4 * size, 2 * size, size, size);

	ctx.fillRect(2 * size, 3 * size, size, size);
	ctx.fillRect(3 * size, 3 * size, size, size);
	ctx.fillRect(4 * size, 3 * size, size, size);

	ctx.fillRect(1 * size, 4 * size, size, size);
	ctx.fillRect(2 * size, 4 * size, size, size);
	ctx.fillRect(3 * size, 4 * size, size, size);
	ctx.fillRect(4 * size, 4 * size, size, size);
	ctx.fillRect(5 * size, 4 * size, size, size);
}
signature(50);
