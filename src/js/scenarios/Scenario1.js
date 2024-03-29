import Scene from "../canvas2d/Scene";
import {RotatingArc} from "../canvas2d/shapes/arcs";
import {Hands} from "../canvas2d/shapes/hands";
import {CenterPoint} from "../canvas2d/shapes/centerPoint";
import {deg2rad, randomRange} from "../utils/MathUtils";
import {Graduation} from "../canvas2d/shapes/Graduation";

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

        // Création du cadran
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

        // Creation des graduations des heures
        const nGraduationsHour = 12;
        this.graduationHour = [];
        for (let i = 0; i < nGraduationsHour; i++){
            const angle_ = deg2rad(360) * i / nGraduationsHour;
            const x_ = this.width / 2 + (this.mainRadius - this.deltaRadius / 2) * Math.cos(angle_);
            const y_ = this.height / 2 + (this.mainRadius - this.deltaRadius / 2) * Math.sin(angle_);
            const length_ = (this.arcs.length + 1) * this.deltaRadius;

            const graduations_ = new Graduation(x_, y_, angle_, length_, this.params.lineWidth);
            this.graduationHour.push(graduations_);
        }

        // Creation des graduations des minutes
        const nGraduationsMinute = 60;
        this.graduationMinute = [];
        for (let i = 0; i < nGraduationsMinute; i++){
            const angle_ = deg2rad(360) * i / nGraduationsMinute;
            const x_ = this.width / 2 + (this.mainRadius - this.deltaRadius / 2) * Math.cos(angle_);
            const y_ = this.height / 2 + (this.mainRadius - this.deltaRadius / 2) * Math.sin(angle_);
            const length_ = (this.arcs.length + 0.25) * this.deltaRadius;

            const graduations_ = new Graduation(x_, y_, angle_, length_, this.params.lineWidth);
            this.graduationMinute.push(graduations_);
        }

        // Creation du point central
        this.centerPoint = new CenterPoint(this.width, this.height, this.context, this.params.color);

        // Creation des aiguilles (heures, minutes, secondes)
        this.Hand = new Hands(this.width, this.height, this.mainRadius, this.params.handWidth);
    }

    //Affichage des éléments
    update() {
        if (!super.update()) return;
        this.clear();
        this.centerPoint.draw(); // Affichage du point central
        this.Hand.draw(this.context, 'hours', 0.40, this.params.speed); // Affichage de l'aiguille des heures
        this.Hand.draw(this.context, 'minutes', 0.60, this.params.speed); // Affichage de l'aiguille des minutes
        this.Hand.draw(this.context, 'seconds', 0.80, this.params.speed); // Affichage de l'aiguille des secondes

        // Affichage du cadran
        this.arcs.forEach(arc => {
            arc.draw(this.context, this.params.color, this.params.lineWidth);
        })

        // Affichage des graduations
        this.graduationHour.forEach(graduationHour => {
            graduationHour.draw(this.context, this.params.color, this.params.lineWidth);
        })
        this.graduationMinute.forEach(graduationMinute => {
            graduationMinute.draw(this.context, this.params.color, this.params.lineWidth);
        })

    }

    //Responsive
    resize() {
        super.resize();
        this.mainRadius = Math.min(this.width, this.height);
        this.mainRadius /= 2;
        this.mainRadius *= 0.65;
        this.deltaRadius = this.mainRadius * 0.075;

        // Resize du cadran
        if (!!this.arcs) {
            this.arcs.forEach((arc, index) => {
                arc.x = this.width / 2;
                arc.y = this.height / 2;
                arc.radius = this.mainRadius + (index - this.arcs.length / 2) * this.deltaRadius;
            })
        }

        // Resize des graduations
        if (!!this.graduationHour) {
            this.graduationHour.forEach((graduationHour, index) => {
                const angle_ = deg2rad(360) * index / this.graduationHour.length;
                graduationHour.x = this.width / 2 + (this.mainRadius - this.deltaRadius / 2) * Math.cos(angle_);
                graduationHour.y = this.height / 2 + (this.mainRadius - this.deltaRadius / 2) * Math.sin(angle_);
                graduationHour.length = (this.arcs.length + 1) * this.deltaRadius;
            })
        }
        if (!!this.graduationMinute) {
            this.graduationMinute.forEach((graduationMinute, index) => {
                const angle_ = deg2rad(360) * index / this.graduationMinute.length;
                graduationMinute.x = this.width / 2 + (this.mainRadius - this.deltaRadius / 2) * Math.cos(angle_);
                graduationMinute.y = this.height / 2 + (this.mainRadius - this.deltaRadius / 2) * Math.sin(angle_);
                graduationMinute.length = (this.arcs.length + 0.10) * this.deltaRadius;
            })
        }
    }
}