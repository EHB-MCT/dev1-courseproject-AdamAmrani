// Canvas instellen
const canvas = document.getElementById("myCanvas");
const context = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Functie om een willekeurige RGB-kleur te genereren
function randomRGBColor() {
	const r = Math.floor(Math.random() * 256);
	const g = Math.floor(Math.random() * 256);
	const b = Math.floor(Math.random() * 256);
	return `rgb(${r}, ${g}, ${b})`;
}

// Functie om een kruis te tekenen op positie (x, y) met een bepaalde grootte en kleur
function tekenKruis(x, y, grootte) {
	const kleur = randomRGBColor(); // Genereer een willekeurige RGB-kleur
	context.strokeStyle = kleur;
	context.lineWidth = 2;

	// Teken het kruis
	context.beginPath();
	context.moveTo(x - grootte / 2, y - grootte / 2); // Diagonaal 1
	context.lineTo(x + grootte / 2, y + grootte / 2);
	context.moveTo(x + grootte / 2, y - grootte / 2); // Diagonaal 2
	context.lineTo(x - grootte / 2, y + grootte / 2);
	context.stroke();
}

// Willekeurig geplaatste kruisen op het canvas
function maakKruisPatroon() {
	const aantalKruisen = Math.floor((canvas.width * canvas.height) / 25000);

	for (let i = 0; i < aantalKruisen; i++) {
		const x = Math.random() * canvas.width;
		const y = Math.random() * canvas.height;
		const grootte = Math.random() * 50 + 20;

		tekenKruis(x, y, grootte);
	}
}

// Canvas wissen en patroon maken
function vernieuwCanvas() {
	context.clearRect(0, 0, canvas.width, canvas.height);
	maakKruisPatroon();
}

// Teken een nieuw patroon bij elke paginavernieuwing
vernieuwCanvas();

// Canvas vernieuwen bij wijziging schermgrootte
window.addEventListener("resize", () => {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	vernieuwCanvas();
});
