import React from "react";
import { ReactP5Wrapper } from "react-p5-wrapper";

export const SketchComp = () => {
  function sketch(p5) {
    class Particle {
      constructor(x, y, hu, firework) {
        this.pos = p5.createVector(x, y);
        this.firework = firework;
        this.lifespan = 255;
        this.hu = hu;
        this.acc = p5.createVector(0, 0);
        if (this.firework) {
          this.vel = p5.createVector(0, p5.random(-20, -8));
          // this.vel.mult(1.5);
        } else {
          // this.vel = p5.Vector.random2D();
          // this.vel.mult(random(2, 10));
          const a = p5.random(p5.TWO_PI);
          const r = p5.height / 40;
          const x = r * 16 * p5.pow(p5.sin(a), 3);
          const y =
            -r *
            (13 * p5.cos(a) -
              5 * p5.cos(2 * a) -
              2 * p5.cos(3 * a) -
              p5.cos(4 * a));
          this.vel = p5.createVector(x, y);
          this.vel.mult(p5.random(0.06, 0.07));
        }
      }

      applyForce(force) {
        this.acc.add(force);
      }

      update() {
        if (!this.firework) {
          this.vel.mult(0.9);
          this.lifespan -= 4;
        }
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
      }

      done() {
        if (this.lifespan < 0) {
          return true;
        } else {
          return false;
        }
      }

      show() {
        if (!this.firework) {
          p5.strokeWeight(24);
          let r = p5.red(this.hu);
          let g = p5.green(this.hu);
          let b = p5.blue(this.hu);
          p5.stroke(r, g, b, this.lifespan);
        } else {
          p5.strokeWeight(24);
          p5.stroke(this.hu);
        }

        p5.point(this.pos.x, this.pos.y);
      }
    }

    class Firework {
      constructor() {
        this.hu = p5.random(colors);

        let r = p5.random(1);
        let x = p5.random(0, p5.width);
        // if (r > 0.5) {
        //   x = random(3*width/4, width);
        // }
        this.firework = new Particle(x, p5.height, this.hu, true);
        this.exploded = false;
        this.particles = [];
      }

      done() {
        if (this.exploded && this.particles.length === 0) {
          return true;
        } else {
          return false;
        }
      }

      update() {
        if (!this.exploded) {
          this.firework.applyForce(gravity);
          this.firework.update();

          if (this.firework.vel.y >= 0) {
            this.exploded = true;
            this.explode();
          }
        }

        for (let i = this.particles.length - 1; i >= 0; i--) {
          this.particles[i].applyForce(gravity);
          this.particles[i].update();

          if (this.particles[i].done()) {
            this.particles.splice(i, 1);
          }
        }
      }

      explode() {
        for (let i = 0; i < 150; i++) {
          const p = new Particle(
            this.firework.pos.x,
            this.firework.pos.y,
            this.hu,
            false
          );
          this.particles.push(p);
        }
      }

      show() {
        if (!this.exploded) {
          this.firework.show();
        }

        for (var i = 0; i < this.particles.length; i++) {
          this.particles[i].show();
        }
      }
    }
    let colors;

    const fireworks = [];
    let gravity;
    p5.setup = () => {
      p5.createCanvas(p5.windowWidth, p5.windowHeight);
      gravity = p5.createVector(0, 0.2);
      p5.stroke(255);
      p5.strokeWeight(4);
      p5.clear();
      colors = [
        p5.color(146, 83, 161),
        p5.color(240, 99, 164),
        p5.color(45, 197, 244),
        p5.color(252, 238, 33),
        p5.color(241, 97, 100),
        p5.color(112, 50, 126),
        p5.color(164, 41, 99),
        p5.color(11, 106, 136),
        p5.color(248, 158, 79),
        p5.color(146, 83, 161),
        p5.color(236, 1, 90),
      ];
    };

    p5.draw = () => {
      p5.background(0);
    //   p5.clear();

      if (p5.random(1) < 0.15) {
        fireworks.push(new Firework());
      }

      for (let i = fireworks.length - 1; i >= 0; i--) {
        fireworks[i].update();
        fireworks[i].show();

        if (fireworks[i].done()) {
          fireworks.splice(i, 1);
        }
      }
    };
  }
  return <ReactP5Wrapper sketch={sketch} />;
};
