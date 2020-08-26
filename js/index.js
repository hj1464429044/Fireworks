class Fireworks {
    constructor(ele, w) {
        this.ele = ele || document.querySelector(".box")
        this.init()
        this.w = w || 20
    }
    init() {
        on(this.ele, "click", (e) => {
            e = e || window.event
            let _x = e.offsetX
            let _y = e.offsetY
            if(_x>=this.ele.offsetWidth - this.w){
                _x=this.ele.offsetWidth - this.w
            }
            if(_y>=this.ele.offsetHeight - this.w){
                _y=this.ele.offsetHeight - this.w
            }
            this.createFire(_x, _y)
        })
    }
    // 创建一个fire
    createFire(x, y) {
        const p = document.createElement("p")
        p.className = "fire"
        setStyle(p, "width", this.w + "px")
        setStyle(p, "height", this.w + "px")
        setStyle(p, "left", x + "px")
        setStyle(p, "top", (this.ele.offsetHeight - this.w) + "px")
        setStyle(p, "backgroundColor", getColor())
        this.ele.appendChild(p)
        this.fireUp(p, x, y)
    }
    // 让fire升空,并清除fire
    fireUp(p, x, y) {
        animate(p, { "top": y }, 500, () => {
            this.ele.removeChild(p)
            this.createFires(x, y)
        })
    }
    // 创建多个fires
    createFires(x, y) {
        const arr = []
        for (let i = 0; i < getRandom(20, 30); i++) {
            const p = document.createElement("p")
            p.className = "fire"
            setStyle(p, "width", this.w + "px")
            setStyle(p, "height", this.w + "px")
            setStyle(p, "left", x + "px")
            setStyle(p, "top", y + "px")
            setStyle(p, "backgroundColor", getColor())
            setStyle(p, "borderRadius", "50%")
            this.ele.appendChild(p)
            arr.push(p)
        }
        this.boom(arr)
    }
    // 让fires炸开
    boom(arr) {
        arr.forEach((item) => {
            animate(item, { "left": getRandom(0, this.ele.offsetWidth - this.w), "top": getRandom(0, this.ele.offsetHeight - this.w) }, 500, () => {
                this.ele.removeChild(item)
            })
        })
    }
}