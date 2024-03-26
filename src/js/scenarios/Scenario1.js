import Scene from "../canvas2d/Scene";
import {RotatingArc} from "../canvas2d/shapes/arcs";
import {deg2rad, randomRange} from "../utils/MathUtils";

export default class Scenario1 extends Scene{
    constructor(id = "canvas-scene") {
        super(id);

        // debug
        this.params.speed = 1; // = params speed des arcs
        this.params.color = 'white' ; // = params speed des arcs
        this.params.lineWidth = 3; // = params taille lignes
        if (this.debug.active) {
            this.debugFolder.add(this.params, 'speed', 0, 4, 0.25);
            this.debugFolder.add(this.params, 'color');
            this.debugFolder.add(this.params, 'lineWidth', 1, 10, 1);
        }

        this.resize();
        const nArcs = 10;

        this.arcs = [];
        for (let i =0; i < nArcs; i++) {
            const x_ = this.width / 2;
            const y_ = this.height / 2;
            const radius_ = this.mainRadius + (i - nArcs / 2)* this.deltaRadius;
            const angle0_ = i != 0 && i <nArcs - 1 ? deg2rad( randomRange(0,360)) : 0;
            const angle1_ = i != 0 && i <nArcs - 1 ? deg2rad( randomRange(0,360)) : 2 * Math.PI;

            const arc_ = new RotatingArc( x_, y_, radius_, angle0_, angle1_ );
            this.arcs.push(arc_);
        }
    }

    drawGraduation() {
        const nGraduations = 12;
        for (let i =0; i < nGraduations; i++) {
            const angle_ = deg2rad(360) * i / nGraduations;
            const x_ = this.width / 2 + (this.mainRadius - this.deltaRadius / 2) * Math.cos(angle_);
            const y_ = this.height / 2 + (this.mainRadius - this.deltaRadius / 2) * Math.sin(angle_);
            const length_ = (this.arcs.length -1) * this.deltaRadius;

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

    update() {
        if (!super.update()) return;
        this.clear();
        this.drawGraduation();

        this.arcs.forEach(arc => {
            arc.update(this.globalContext.time.delta, this.params.speed);
            arc.draw(this.context, this.params.color, this.params.lineWidth);
        })
    }
    resize() {
        super.resize();
        this.mainRadius = Math.min(this.width, this.height);
        this.mainRadius/= 2;
        this.mainRadius*= 0.65;
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