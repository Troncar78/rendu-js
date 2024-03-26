import {randomRange} from "../../utils/MathUtils";

export class RotatingArc{
    constructor(x, y, radius, startAngle, endAngle) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.startAngle = startAngle;
        this.endAngle = endAngle;

        this.vAngular = randomRange(-5, 5);
    }

    update(delta = 16, speed = 1) {
        this.startAngle += speed * this.vAngular * delta / 1000;
        this.endAngle += speed * this.vAngular * delta / 1000;
    }

    draw(context, color) {
        context.save();
        context.beginPath();
        context.translate(this.x, this.y);
        context.arc(0, 0,
            this.radius,
            this.startAngle,
            this.endAngle);
        context.strokeStyle = color;
        context.stroke();
        context.closePath();
        context.restore();
    }
}