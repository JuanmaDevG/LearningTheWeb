

function start_computer()
{
    //Communicate with css to apply styles and animations
}


/* 
    --------------------
    -Initial operations-
    --------------------
*/

document.addEventListener("DOMContentLoaded", () => {
    let ventilation_grill = document.getElementById("ventilation-grill");
    const TEMPLATE_ROWS = 9, TEMPLATE_COLS = 50;
    ventilation_grill.style.gridTemplateRows = `repeat(${TEMPLATE_ROWS}, 1fr)`;
    ventilation_grill.style.gridTemplateColumns = `repeat(${TEMPLATE_COLS}, 1fr)`;
    for(let i=1; i <= TEMPLATE_ROWS; i++)
    {
        for(let j=1; j < TEMPLATE_COLS; j++)
        {
            //TODO: Append the ventilation holes to the ventilation gill object
        }
    }
})