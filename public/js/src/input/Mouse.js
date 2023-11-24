// JS class that keeps track of mouse position and button state

export default class Mouse {
    // constructor
    constructor() {
        // set the position
        this.x = 0;
        this.y = 0;

        // set the button state
        this.left = false;
        this.middle = false;
        this.right = false;

        // add event listeners
        window.addEventListener("mousemove", this.mousemove.bind(this));
        window.addEventListener("mousedown", this.mousedown.bind(this));
        window.addEventListener("mouseup", this.mouseup.bind(this));

        // prevent context menu
        window.addEventListener("contextmenu", function (event) {
            event.preventDefault();
        });
    }

    // mousemove event
    mousemove(event) {
        // set the position
        this.x = event.clientX;
        this.y = event.clientY;
    }

    // mousedown event
    mousedown(event) {
        // set the button state
        if (event.button == 0) {
            this.left = true;
        } else if (event.button == 1) {
            this.middle = true;
        } else if (event.button == 2) {
            this.right = true;
        }
    }

    // mouseup event
    mouseup(event) {
        // set the button state
        if (event.button == 0) {
            this.left = false;
        } else if (event.button == 1) {
            this.middle = false;
        } else if (event.button == 2) {
            this.right = false;
        }
    }
}
