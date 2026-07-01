const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');
let width, height, stars = [], numStars = 1000;

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    stars = [];
    for (let i = 0; i < numStars; i++) {
        stars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            r: Math.random() * 1.6,
            d: Math.random() * numStars
        });
    }
}

function draw() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < stars.length; i++) {
        let s = stars[i];
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2, false);
        // Brillo basado en el tamaño
        const alpha = 0.15 + s.r * 0.6;
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.fill();
        // Movimiento (más pequeñas se mueven más lento)
        s.y += (s.r * 0.2) * 0.5;
        if (s.y > height) {
            s.y = -10;
            s.x = Math.random() * width;
        }
    }
    requestAnimationFrame(draw);
}

window.addEventListener('resize', resize);
resize();
draw();