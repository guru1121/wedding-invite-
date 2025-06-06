// src/Fireworks.jsx
import { useEffect, useRef } from "react";

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
      }

      update() {
        this.y -= this.velocity;
        if (this.y < this.targetY) {
          this.explode();
        }
      }

      explode() {
        for (let i = 0; i < 50; i++) {
          fireworks.push(new Particle(this.x, this.y, this.color));
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
      constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 2;
        this.color = color;
        this.angle = Math.random() * 2 * Math.PI;
        this.speed = Math.random() * 4 + 1;
        this.life = 100;
      }

      update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
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

      fireworks.forEach((fw, i) => {
        fw.update();
        fw.draw();
        if (fw.dead || fw.life <= 0) fireworks.splice(i, 1);
      });

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
