

let computer_is_running = false;

function start_computer()
{
    const framebuffer = document.getElementById("computer-framebuffer");
    const ctx = framebuffer.getContext("2d");

    if(computer_is_running) //Shut down
    {
        ctx.clearRect(0, 0, framebuffer.width, framebuffer.height);
        //TODO: Free resources and stop processes if needed and add a GoodBye screen
        computer_is_running = false;
        return;
    }
    computer_is_running = true;

    ctx.fillStyle = "rgb(255, 0, 0)";
    ctx.fillRect(10, 10, 50, 50);
    ctx.fillStyle = "rgba(0,0,255,0.5)";
    ctx.fillRect(35, 35, 50, 50);
}


/* 
    Main
*/

document.addEventListener("DOMContentLoaded", () => {
    let ventilation_grill = document.getElementById("ventilation-grill");
    const TEMPLATE_ROWS = 15, TEMPLATE_COLS = 80;
    ventilation_grill.style.gridTemplateRows = `repeat(${TEMPLATE_ROWS}, 1fr)`;
    ventilation_grill.style.gridTemplateColumns = `repeat(${TEMPLATE_COLS}, 1fr)`;

    for(let i=1; i <= TEMPLATE_ROWS; i++)
    {
        for(let j=1; j <= TEMPLATE_COLS; j++)
        {
            const ventilation_hole = document.createElement("div");
            ventilation_hole.className = "ventilation-hole";
            ventilation_hole.style.gridRow = `${i}`;
            ventilation_hole.style.gridColumn = `${j}`;
            ventilation_grill.appendChild(ventilation_hole);
        }
    }
});