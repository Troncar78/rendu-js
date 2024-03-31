export class Hands {
    constructor(x, y, radius, width){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.width = width;
    }

    draw(context, timeUnit , length, speed, color){
        this.date = new Date();
        let time;
        switch(timeUnit) {
            case 'hours':
                time = this.date.getHours() % 12 + this.date.getMinutes() / 60;
                break;
            case 'minutes':
                time = this.date.getMinutes() + this.date.getSeconds() / 60;
                break;
            case 'seconds':
                time = this.date.getSeconds() + this.date.getMilliseconds() / 1000;
                break;
        }
        const angle = (time * 2 * Math.PI / (timeUnit === 'hours' ? 12 : 60) - Math.PI / 2) * speed;


        context.save();
        context.beginPath();
        context.moveTo(this.x / 2, this.y / 2);
        context.lineTo(this.x / 2 + this.radius * length * Math.cos(angle), this.y / 2 + this.radius * length * Math.sin(angle));
        context.strokeStyle = color;
        context.lineWidth = this.width;
        context.stroke();
        context.closePath();
        context.restore();
    }
}