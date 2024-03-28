import Scene from "../canvas2d/Scene";
import {RotatingArc} from "../canvas2d/shapes/arcs";
import {deg2rad, randomRange} from "../utils/MathUtils";

export default class Scenario1 extends Scene{
    constructor(id = "canvas-scene") {
        super(id);

        // debug
        this.params.speed = 1; // = params speed des arcs
        this.params.color = 'white' ; // = params speed des arcs
        this.params.lineWidth = 3; // = params taille lignes du cercle
        this.params.handWidth = 1.5; // = params taille des aiguilles
        if (this.debug.active) {
            this.debugFolder.add(this.params, 'speed', 0, 4, 0.25);
            this.debugFolder.add(this.params, 'lineWidth', 1, 5, 0.3);
            this.debugFolder.add(this.params, 'handWidth', 1, 5, 0.3);
        }

        this.resize();
        const nArcs = 1;

        this.arcs = [];
        for (let i= 0; i < nArcs; i++) {
            const x_ = this.width / 2;
            const y_ = this.height / 2;
            const radius_ = this.mainRadius + (i - nArcs / 2)* this.deltaRadius;
            const angle0_ = i != 0 && i < nArcs - 1 ? deg2rad( randomRange(0,360)) : 0;
            const angle1_ = i != 0 && i < nArcs - 1 ? deg2rad( randomRange(0,360)) : 2 * Math.PI;

            const arc_ = new RotatingArc( x_, y_, radius_, angle0_, angle1_ );
            this.arcs.push(arc_);
        }
    }

    drawHoursGraduation(nGraduations =  12, arcLenght = 1.5) {
        for (let i = 0 ; i < nGraduations; i++) {
            const angle_ = deg2rad(360) * i / nGraduations;
            const x_ = this.width / 2 + (this.mainRadius - this.deltaRadius / 2) * Math.cos(angle_);
            const y_ = this.height / 2 + (this.mainRadius - this.deltaRadius / 2) * Math.sin(angle_);
            const length_ = (this.arcs.length + arcLenght ) * this.deltaRadius;

            this.context.save();
            this.context.beginPath();

            this.context.translate(x_, y_);
            this.context.rotate(angle_);

            this.context.moveTo(-length_ / 2, 0);
            this.context.lineTo(length_ / 2, 0);

            this.context.strokeStyle = this.params.color;
            this.context.width = this.params.lineWidth;
            this.context.stroke();
            this.context.closePath();
            this.context.restore();
        }
    }
    drawMinutesGraduation() {
        this.drawHoursGraduation(60, 0.25);
    }

    // Fonction pour dessiner le centre du cadran
    drawCenterPoint() {
        this.context.beginPath();
        this.context.arc(this.width / 2, this.height / 2, 4, 0, 2 * Math.PI, false);
        this.context.fillStyle = this.params.color;
        this.context.fill();
    }

    // Fonction pour dessiner les aiguilles
    drawHand(width , length, timeUnit) {

        const date = new Date();
        let time;
        switch(timeUnit) {
            case 'hours':
                time = date.getHours() % 12 + date.getMinutes() / 60;
                break;
            case 'minutes':
                time = date.getMinutes() + date.getSeconds() / 60;
                break;
            case 'seconds':
                time = date.getSeconds() + date.getMilliseconds() / 1000;
                break;
        }
        const angle = (time * 2 * Math.PI / (timeUnit === 'hours' ? 12 : 60) - Math.PI / 2) * this.params.speed;

        this.context.beginPath();
        this.context.moveTo(this.width / 2, this.height / 2);
        this.context.lineTo(this.width / 2 + this.mainRadius * length * Math.cos(angle), this.height / 2 + this.mainRadius * length * Math.sin(angle));
        this.context.strokeStyle = this.params.color;
        this.context.lineWidth = width;
        this.context.stroke();
        this.context.closePath();
    }
    update() {
        if (!super.update()) return;
        this.clear();
        this.drawHoursGraduation();
        this.drawMinutesGraduation();
        this.drawCenterPoint();
        this.drawHand(this.params.handWidth, 0.50, 'hours'); // Heures
        this.drawHand(this.params.handWidth, 0.625, 'minutes'); // Minutes
        this.drawHand(this.params.handWidth, 0.80, 'seconds'); // Secondes

        this.arcs.forEach(arc => {
            arc.draw(this.context, this.params.color, this.params.lineWidth);
        })

    }
    resize() {
        super.resize();
        this.mainRadius = Math.min(this.width, this.height);
        this.mainRadius /= 2;
        this.mainRadius *= 0.65;
        this.deltaRadius = this.mainRadius * 0.075;

        if (!!this.arcs) {
            this.arcs.forEach((arc, index) => {
                arc.x = this.width / 2;
                arc.y = this.height / 2;
                arc.radius = this.mainRadius + (index - this.arcs.length / 2) * this.deltaRadius;
            })
        }
    }
}