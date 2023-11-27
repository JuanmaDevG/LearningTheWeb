

let computer_is_running = false;

function start_computer()
{
    const framebuffer = document.getElementById("computer-framebuffer");
    const ctx = framebuffer.getContext("2d");

    if(computer_is_running) //Shut down
    {
        //TODO: clean framebuffer and stop everything
        computer_is_running = false;
        return;
    }
    computer_is_running = true;

    ctx.fillStyle = "rgb(255, 0, 0)";
    ctx.fillRect(10, 10, 200, 100);
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