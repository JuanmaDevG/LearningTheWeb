
class Vertex {
    x = 0;
    y = 0;

    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }
}

class EquilateralTriangle {
    #v_top = new Vertex(0,0);
    #v_left = new Vertex(0,0);
    #v_right = new Vertex(0,0);
    #side_length = 0;
    #height = 0;

    constructor(v_top, side_length)
    {
        this.#v_top = v_top;
        this.#side_length = side_length;
        //Equilateral triangle height formula
        this.#height = (Math.sqrt(3) / 2) * side_length;

        let half_side_len = this.#side_length / 2;
        this.#v_left = new Vertex(this.#v_top.x - half_side_len, this.#v_top.y + this.#height);
        this.#v_right = new Vertex(this.#v_top.x + half_side_len, this.#v_top.y + this.#height)
    }

    /*
        Returns an array with the triangle vertices: [top, down_left, down_right]
    */
    getVertices()
    {
        return [this.#v_top, this.#v_left, this.#v_right];
    }

    /*
        Returns an EquilateralTriangle object whose top vertex is located on it's parent's 
        down left vertex.
    */
    getDownLeftOffset()
    {
        return new EquilateralTriangle(this.#v_left, this.#side_length);
    }

    /*
        Returns an EquilateralTriangle object whose top vertex is located in it's parent's 
        down right vertex
    */
    getDownRightOffset()
    {
        return new EquilateralTriangle(this.#v_right, this.#side_length);
    }

    /*
        Returns an equilateral EquilateralTriangle at left from the parent object
    */
    getLeftOffset()
    {
        return new EquilateralTriangle(new Vertex(this.#v_top.x - this.#side_length, this.#v_top.y), this.#side_length);
    }

    /*
        Returns an EquilateralTriangle placed at right from the parent object
    */
    getRightOffset()
    {
        return new EquilateralTriangle(new Vertex(this.#v_top.x + this.#side_length, this.#v_top.y), this.#side_length);
    }

    draw(ctx)
    {
        //TODO: Make sure instance of context
        if(ctx instanceof CanvasRenderingContext2D)
        {
            ctx.beginPath();
        }
        ctx.moveTo(this.#v_top.x, this.#v_top.y);
        ctx.lineTo(this.#v_right.x, this.#v_right.y);
        ctx.lineTo(this.#v_left.x, this.#v_left.y);
        ctx.closePath();
    }
}