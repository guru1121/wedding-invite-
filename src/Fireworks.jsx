import { useEffect, useRef } from "react";

const burstTypes = ["circle", "star", "heart", "ring", "spiral", "doubleRing"];

const Fireworks = () => {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fireworks = [];

    class Firework {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height;
        this.targetY = Math.random() * canvas.height / 2;
        this.size = Math.random() * 2 + 1;
        this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
        this.velocity = Math.random() * 3 + 4;
        this.burstType = burstTypes[Math.floor(Math.random() * burstTypes.length)];
      }

      update() {
        this.y -= this.velocity;
        if (this.y < this.targetY) {
          this.explode();
        }
      }

      explode() {
        let count = 50;
        if (this.burstType === "star") count = 10;
        if (this.burstType === "heart") count = 30;
        if (this.burstType === "ring") count = 40;
        if (this.burstType === "spiral") count = 40;
        if (this.burstType === "doubleRing") count = 60;
        for (let i = 0; i < count; i++) {
          fireworks.push(new Particle(this.x, this.y, this.color, this.burstType, i, count));
        }
        this.dead = true;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    class Particle {
      constructor(x, y, color, burstType, i, total) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 2;
        this.color = color;
        this.life = 100;
        this.burstType = burstType;
        this.i = i;
        this.total = total;
        this.angle = (2 * Math.PI * i) / total;
        this.speed = Math.random() * 4 + 1;
      }

      update() {
        switch (this.burstType) {
          case "circle":
            this.x += Math.cos(this.angle) * this.speed;
            this.y += Math.sin(this.angle) * this.speed;
            break;
          case "star":
            // Star: alternate long/short rays
            const r = this.i % 2 === 0 ? 1.5 : 0.7;
            this.x += Math.cos(this.angle) * this.speed * r;
            this.y += Math.sin(this.angle) * this.speed * r;
            break;
          case "heart":
            // Heart parametric equation
            const t = this.angle;
            this.x += 16 * Math.pow(Math.sin(t), 3) * 0.2;
            this.y -= (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * 0.2;
            break;
          case "ring":
            // Ring: all particles move out at same radius
            this.x += Math.cos(this.angle) * this.speed * 1.2;
            this.y += Math.sin(this.angle) * this.speed * 1.2;
            break;
          case "spiral":
            // Spiral outwards
            const spiralStep = this.life / 100;
            this.x += Math.cos(this.angle + spiralStep * 6) * this.speed * spiralStep;
            this.y += Math.sin(this.angle + spiralStep * 6) * this.speed * spiralStep;
            break;
          case "doubleRing":
            // Two rings: alternate radius
            const radius = this.i % 2 === 0 ? 1.2 : 2.0;
            this.x += Math.cos(this.angle) * this.speed * radius;
            this.y += Math.sin(this.angle) * this.speed * radius;
            break;
          default:
            this.x += Math.cos(this.angle) * this.speed;
            this.y += Math.sin(this.angle) * this.speed;
        }
        this.life--;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    const animate = () => {
      ctx.fillStyle = "rgba(0,0,0,0.2)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      if (Math.random() < 0.05) fireworks.push(new Firework());

      for (let i = fireworks.length - 1; i >= 0; i--) {
        const fw = fireworks[i];
        fw.update();
        fw.draw();
        if (fw.dead || fw.life <= 0) fireworks.splice(i, 1);
      }

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
};

export default Fireworks;