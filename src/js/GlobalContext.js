import Debug from "./utils/Debug"
import Time from "./utils/Time"
import Size from "./utils/Size";

let instance = null

export default class GlobalContext {
    constructor() {
        if (!!instance) return instance
        instance = this

        // Debug
        this.debug = new Debug()

        // Time
        this.time = new Time()
        this.time.on('update', () => { this.update() })

        // Window size
        this.windowSize = new Size();
        this.windowSize.on('resize', () => { this.resize() })

        // Scenes
        this.scenes = []

        window.addEventListener('resize', () => {
            this.destroy()
        })
    }

    pushScene(scene) {
        this.scenes.push(scene)
    }

    resize() {
        this.scenes.forEach(s => {
            s.resize()
        })
    }
    update() {
        this.scenes.forEach(s => {
            s.update()
        })
    }

    destroy() {
        this.time.off('update')
        this.windowSize.off('resize')

        this.scenes.forEach(s => {
            s.destroy()
        })

        if(this.debug.active) this.debug.ui.destroy()
    }
}