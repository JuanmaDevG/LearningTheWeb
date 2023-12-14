
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
    #v_top = Vertex(0,0);
    #v_left = Vertex(0,0);
    #v_right = Vertex(0,0);
    #side_length = 0;
    #height = 0;

    constructor(v_top, side_length)
    {
        this.#v_top = v_top;
        this.#side_length = side_length;
        //Equilateral triangle height formula
        this.#height = (Math.sqrt(3) / 2) * side_length;

        let half_side_len = this.#side_length / 2;
        this.#v_left = Vertex(this.#v_top.x - half_side_len, this.#v_top.y + this.#height);
        this.#v_right = Vertex(this.#v_top.x + half_side_len, this.#v_top.y + this.#height)
    }

    /*
        Returns an array with the triangle vertices: [top, down_left, down_right]
    */
    getVertices()
    {
        return [Vertex(this.#v_top), Vertex(this.#v_left), Vertex(this.#v_right)];
    }

    /*
        Returns an EquilateralTriangle object whose top vertex is located on it's parent's 
        down left vertex.
    */
    getDownLeftOffset()
    {
        return EquilateralTriangle(this.#v_left, this.#side_length);
    }

    /*
        Returns an EquilateralTriangle object whose top vertex is located in it's parent's 
        down right vertex
    */
    getDownRightOffset()
    {
        return EquilateralTriangle(this.#v_right, this.#side_length);
    }

    /*
        Returns an equilateral EquilateralTriangle at left from the parent object
    */
    getLeftOffset()
    {
        return EquilateralTriangle(Vertex(this.#v_top.x - this.#side_length, this.#v_top.y), this.#side_length);
    }

    /*
        Returns an EquilateralTriangle placed at right from the parent object
    */
    getRightOffset()
    {
        return EquilateralTriangle(Vertex(this.#v_top.x + this.#side_length, this.#v_top.y), this.#side_length);
    }
}