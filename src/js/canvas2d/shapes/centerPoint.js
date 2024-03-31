export class CenterPoint {
    constructor(x, y, context) {
        this.x = x;
        this.y = y;
        this.context = context;
    }

    draw(color) {
        this.context.save();
        this.context.beginPath();
        this.context.arc(this.x / 2, this.y / 2, 4, 0, 2 * Math.PI, false);
        this.context.fillStyle = color;
        this.context.fill();
        this.context.closePath();
        this.context.restore();
    }
}