/*
    Generic utilities
*/

function clean(framebuffer, ctx)
{
    ctx.clearRect(0, 0, framebuffer.width, framebuffer.height);
}

function reset_styles(ctx)
{
    ctx.strokeStyle = "black";
    ctx.fillStyle = "black";
    ctx.lineWidth = 1;
    ctx.globalAlpha = 1;
}


/*
    Simulations to be run
*/

function red_triangle(framebuffer, ctx)
{
    clean(framebuffer, ctx);
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.moveTo(framebuffer.width / 2, framebuffer.height / 3);
    ctx.lineTo((framebuffer.width / 3) * 2, (framebuffer.height / 3) * 2);
    ctx.lineTo(framebuffer.width / 3, (framebuffer.height / 3) * 2);
    ctx.closePath();
    ctx.fill();
}

function smile_face(framebuffer, ctx)
{
    clean(framebuffer, ctx);

    circle = {
        x: framebuffer.width / 2,
        y: framebuffer.height / 2, 
        radius: framebuffer.height / 4,  
        start_angle: 0, 
        fin_angle: 2 * Math.PI
    };

    //You can move the draw pointer like this or to make a lot of draw calls with [beginPath -> draw -> fill/stroke -> loop]

    ctx.beginPath();
    //Face
    ctx.arc(circle.x, circle.y, circle.radius, circle.start_angle, circle.fin_angle);
    //Left eye
    ctx.moveTo(circle.x - (circle.radius / 2) + (circle.radius / 10), circle.y - (circle.radius / 2));
    ctx.arc(circle.x - (circle.radius / 2), circle.y - (circle.radius / 2), circle.radius / 10, circle.start_angle, circle.fin_angle);
    //Right eye
    ctx.moveTo(circle.x + (circle.radius / 2) + (circle.radius / 10), circle.y - (circle.radius / 2));
    ctx.arc(circle.x + (circle.radius / 2), circle.y - (circle.radius / 2), circle.radius / 10, circle.start_angle, circle.fin_angle);
    //Mouth
    ctx.moveTo(circle.x + (circle.radius * 0.6), circle.y);
    ctx.arc(circle.x, circle.y, circle.radius * 0.6, circle.start_angle, circle.fin_angle / 2);
    ctx.closePath();
    ctx.stroke();
}

function bezier_curve(framebuffer, ctx)
{
    clean(framebuffer, ctx);

    ctx.strokeStyle = "blue";
    ctx.beginPath();
    ctx.moveTo(0, framebuffer.height / 2);
    ctx.bezierCurveTo(
        framebuffer.width / 4, framebuffer.height / 8, 
        3 * (framebuffer.width / 4), 7 * (framebuffer.height / 8), 
        framebuffer.width, framebuffer.height / 2
    );
    ctx.stroke();
    reset_styles(ctx);
}

function plot_twist(framebuffer, ctx)
{
    clean(framebuffer, ctx);
    
    ctx.beginPath();
    ctx.moveTo(75 * 6, 25 * 6);
    ctx.quadraticCurveTo(25 * 6, 25 *  6, 25 * 6, 62.5 *6);
    ctx.quadraticCurveTo(25 * 6, 100 * 6, 50 * 6, 100 * 6);
    ctx.quadraticCurveTo(50 * 6, 120 * 6, 30 * 6, 125 * 6);
    ctx.quadraticCurveTo(60 * 6, 120 * 6, 65 * 6, 100 * 6);
    ctx.quadraticCurveTo(125 * 6, 100 *6, 125 *6, 62.5 *6);
    ctx.quadraticCurveTo(125 * 6, 25 * 6, 75 * 6, 25 *  6);
    ctx.stroke();
}

//Storing graphics into a Path2D object is better for performance
function path2DRectangle(framebuffer, ctx)
{
    clean(framebuffer, ctx);
    const draw_buf = new Path2D();

    const px = framebuffer.width / 4, py = framebuffer.height / 4;
    draw_buf.rect(px, py, px * 2, py * 2);

    ctx.fillStyle = "rgb(120, 20, 80)";
    ctx.fill(draw_buf);
    reset_styles(ctx);
}

function multicoloredTriangles(framebuffer, ctx)
{
    clean(framebuffer, ctx);
    const triangles = [
        new EquilateralTriangle(new Vertex(framebuffer.width / 2, framebuffer.height / 4), 30)
    ];

    //Collect triangles to draw
    const deepness_level = 15;
    let left_pivot_triangle = triangles[0];
    for(let i = 1, triangles_per_level = 1, arr_index = 0; i < deepness_level; i++, triangles_per_level++)
    {
        left_pivot_triangle = left_pivot_triangle.getDownLeftOffset();
        triangles.push(left_pivot_triangle);
        arr_index++;
        for(let j = 0; j < triangles_per_level; j++, arr_index++)
        {
            triangles.push(triangles[arr_index].getRightOffset());
        }
    }

    //I could use a Path2D object but it can't change each triangle's specific color
    //Draw the triangles
    for(let tr of triangles)
    {
        ctx.fillStyle = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
        ctx.beginPath();
        let vertices = tr.getVertices();
        ctx.moveTo(vertices[0].x, vertices[0].y);
        ctx.lineTo(vertices[1].x, vertices[1].y);
        ctx.lineTo(vertices[2].x, vertices[2].y);
        ctx.closePath();
        ctx.fill();
    }
    reset_styles(ctx);
}

function gradientTriangleGrid(framebuffer, ctx)
{
    clean(framebuffer, ctx);
    const 
        grill = { width: 20, height: 20 }, 
        drawing = new Path2D(), 
        start_point = { x: (framebuffer.width / 2) - (framebuffer.width / 5), y: framebuffer.height / 4}, 
        triangle_side_length = 25, 
        gradient = ctx.createLinearGradient(
            start_point.x, start_point.y, 
            start_point.x + (triangle_side_length * grill.height), start_point.y + (triangle_side_length * grill.height)
        );
    let pivot_triangle = new EquilateralTriangle(
        new Vertex(start_point.x + (triangle_side_length / 2), start_point.y), triangle_side_length
    );

    for(let i=1; i <= grill.height; i++)
    {
        let evenRow = i % 2 == 0, actual_triangle = pivot_triangle;
        gradient.addColorStop((1 / grill.height) * i, `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`);

        for(let j=1; j <= (evenRow ? grill.width -1 : grill.width); j++)
        {
            actual_triangle.draw(drawing);
            actual_triangle = actual_triangle.getRightOffset();
        }

        if(evenRow) {
            pivot_triangle = pivot_triangle.getDownLeftOffset();
        }
        else {
            pivot_triangle = pivot_triangle.getDownRightOffset();
        }
    }
    ctx.fillStyle = gradient;
    ctx.fill(drawing);
    reset_styles();
}

/*
    The context functions save() and restore() do not save an entire frame, it refers to 
*/
function saveRestoreState(framebuffer, ctx)
{
    clean(framebuffer, ctx);
    
    //Saving styles
    ctx.fillStyle = "red";
    ctx.font = "15px serif";
    ctx.save();
    ctx.fillStyle = "blue";

    //Will draw blue 
    ctx.fillText("Blue fillstyle state", framebuffer.width / 4, (framebuffer.height / 6) - 15);
    ctx.fillRect(framebuffer.width / 4, framebuffer.height / 6, 150, 150);
    
    //Will draw red (unstack red fill state)
    ctx.restore();
    ctx.fillText("Red fillstyle state", framebuffer.width / 2, (framebuffer.height  / 2) - 15);
    ctx.fillRect(framebuffer.width / 2, framebuffer.height / 2, 50, 50);

    reset_styles(ctx);
}


/*
    Building the drawing playground
*/

const simulations = [
    { name: "Clear screen", proc: clean },
    { name: "Draw red triangle", proc: red_triangle}, 
    { name: "Draw smiley face", proc: smile_face }, 
    { name: "Bezier curve", proc: bezier_curve }, 
    { name: "Plot twist", proc: plot_twist }, 
    { name: "Centered rectangle", proc: path2DRectangle}, 
    { name: "Random color triangles", proc: multicoloredTriangles }, 
    { name: "Gradient tr grid", proc: gradientTriangleGrid }, 
    { name: "Save and restore state", proc: saveRestoreState}
];

addEventListener("DOMContentLoaded", () => {
    //Setting framebuffer
    const framebuffer = document.getElementById("framebuffer");
    framebuffer.width = window.innerWidth;
    framebuffer.height = window.innerHeight;

    //Configuring grid
    const COLUMNS = 4;
    let btn_container = document.getElementById("simulation-button-container");
    btn_container.style.gridTemplateColumns = `repeat(${COLUMNS}, 1fr)`;
    btn_container.style.gridAutoRows = "70px";

    //Adding event functions
    const container = document.getElementById("simulation-button-container");
    const ctx = framebuffer.getContext("2d");
    let actual_col = 1, actual_row = 1;
    for(const simulation of simulations)
    {
        const btn = document.createElement("button");
        btn.className = "simulation-button";
        if(actual_col > 4)
        {
            actual_col = 1;
            actual_row++;
        }
        btn.style.gridRow = `${actual_row}`;
        btn.style.gridColumn = `${actual_col}`;
        btn.innerHTML = simulation.name;
        btn.onclick = simulation.proc.bind(null/* no object */, framebuffer, ctx);

        container.appendChild(btn);
        actual_col++;
    }
});
