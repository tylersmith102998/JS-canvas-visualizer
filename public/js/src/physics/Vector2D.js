// 2D Vector class

export default class Vector2D {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    // add
    add(vector) {
        return new Vector2D(this.x + vector.x, this.y + vector.y);
    }

    // subtract
    subtract(vector) {
        return new Vector2D(this.x - vector.x, this.y - vector.y);
    }

    // multiply
    multiply(scalar) {
        return new Vector2D(this.x * scalar, this.y * scalar);
    }

    // divide
    divide(scalar) {
        if (scalar != 0) {
            return new Vector2D(this.x / scalar, this.y / scalar);
        } else {
            console.error("Cannot divide by zero");
        }
    }

    // magnitude
    magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    // normalize
    normalize() {
        const magnitude = this.magnitude();
        return magnitude !== 0 ? this.divide(this.magnitude()) : new Vector2D();
    }

    // dot product
    dot(vector) {
        return this.x * vector.x + this.y * vector.y;
    }

    // cross product
    cross(vector) {
        return this.x * vector.y - this.y * vector.x;
    }

    // angle between two vectors
    angleTo(vector) {
        return Math.acos(
            this.dot(vector) / (this.magnitude() * vector.magnitude())
        );
    }

    // distance between two vectors
    distanceTo(vector) {
        return Math.sqrt(
            Math.pow(this.x - vector.x, 2) + Math.pow(this.y - vector.y, 2)
        );
    }

    // get direction vector from another vector
    directionTo(vector) {
        return vector.subtract(this).normalize();
    }

    // rotate
    rotate(angle) {
        const x = this.x * Math.cos(angle) - this.y * Math.sin(angle);
        const y = this.x * Math.sin(angle) + this.y * Math.cos(angle);
        return new Vector2D(x, y);
    }

    // project
    project(vector) {
        const scalar = this.dot(vector) / vector.magnitude();
        return vector.normalize().multiply(scalar);
    }

    // reflect
    reflect(normal) {
        return this.subtract(normal.multiply(2 * this.dot(normal)));
    }

    // toString
    toString() {
        return `(${this.x}, ${this.y})`;
    }

    // equals
    equals(vector) {
        return this.x === vector.x && this.y === vector.y;
    }

    // clone
    clone() {
        return new Vector2D(this.x, this.y);
    }
}
