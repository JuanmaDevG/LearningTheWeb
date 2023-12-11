
/*
    Generic utilities
*/

function clean(framebuffer, ctx)
{
    ctx.clearRect(0, 0, framebuffer.width, framebuffer.height);
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
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, circle.start_angle, circle.fin_angle );
    ctx.stroke();
    ctx.closePath();
    ctx.arc(circle.x - (circle.radius / 2), circle.y - (circle.radius / 2), circle.radius / 10, circle.start_angle, circle.fin_angle);
    ctx.stroke();
    ctx.closePath();
    ctx.arc(circle.x + (circle.radius / 2), circle.y - (circle.radius / 2), circle.radius / 10, circle.start_angle, circle.fin_angle);
    ctx.stroke();
    ctx.closePath();
    //TODO: solve the bug
}


/*
    Building the drawing playground
*/

const simulations = [
    { name: "Clear screen", proc: clean },
    { name: "Draw red triangle", proc: red_triangle}, 
    { name: "Draw smiley face", proc: smile_face }
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