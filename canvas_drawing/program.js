
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


/*
    Building the drawing playground
*/

const simulations = [
    { name: "Clear screen", proc: clean },
    { name: "Draw red triangle", proc: red_triangle}, 
    { name: "Draw smiley face", proc: smile_face }, 
    { name: "Bezier curve", proc: bezier_curve }, 
    { name: "Plot twist", proc: plot_twist }, 
    { name: "Centered rectangle", proc: path2DRectangle}
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
