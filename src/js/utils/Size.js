import EventEmitter from "./EventEmitter";

export default class Size extends EventEmitter{
    constructor() {
        super();
        this.getWindowSize();
        window.addEventListener('resize',() => {
            this.getWindowSize();
        });
    }

    getWindowSize() {
            this.width = window.innerWidth,
            this.height = window.innerHeight,
            this.pixelRatio = Math.min(window.devicePixelRatio, 2)

    }
}