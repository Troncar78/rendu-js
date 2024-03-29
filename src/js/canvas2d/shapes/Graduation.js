export class Graduation{
    constructor(x, y, angle, length, lineWidth, speed) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.length = length;
        this.lineWidth = lineWidth;
        this.speed = speed;
    }

    draw(context, color) {
        context.save();
        context.beginPath();

        context.translate(this.x, this.y);
        context.rotate(this.angle);

        context.moveTo(-this.length / 2, 0);
        context.lineTo(this.length / 2, 0);

        context.strokeStyle = color;
        context.width = this.lineWidth;
        context.stroke();
        context.closePath();
        context.restore();
    }
}
