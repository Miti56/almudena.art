const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#1dd1a1', '#5f27cd'];

function random(min, max) {
    return Math.random() * (max - min) + min;
}

class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = random(0, canvas.width);
        this.y = random(0, canvas.height);
        this.size = random(2, 6);
        this.speed = random(0.2, 1);
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.angle = random(0, 2 * Math.PI);
        this.radius = random(50, 200);
    }

    update() {
        this.angle += 0.002;
        this.x += Math.sin(this.angle) * 0.5;
        this.y -= this.speed;

        if (this.y < -this.size) this.reset();
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

for (let i = 0; i < 120; i++) {
    particles.push(new Particle());
}

function animate() {
    ctx.fillStyle = 'rgba(17,17,17,0.3)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
