class Vertex {

    x = 0;
    y = 0;

    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }
}

class Rectangle {
    #origin = Vertex(0, 0);
    width = 0;
    height = 0;

    constructor(v_origin, width, height) 
    {
        this.#origin = v_origin;
        this.width = width;
        this.hright = height;
    }

    offsetRight() { this.#origin.x += this.width; }
    offsetLeft() { this.#origin.x -= this.width; }
    offsetUp() { this.#origin.y += this.height; }
    offsetDown() { this.#origin.y -= this.height; }
}

class Triangle {
    v_upper = Vertex(0, 0);
    v_left = Vertex(0, 0);
    v_right = Vertex(0, 0);

    constructor(v_upper, v_left, v_right)
    {
        this.v_upper = v_upper;
        this.v_left = v_left;
        this.v_right = v_right;
    }
}