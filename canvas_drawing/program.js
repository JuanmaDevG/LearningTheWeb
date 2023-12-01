//TODO: onclick functions that empty the screen to pass to another function
function clean_screen(framebuffer, context)
{
    context.clearRect(0, 0, framebuffer.width, framebuffer.height);
}

function smile_face()
{
    //Some
}

/*
Configuring framebuffer
*/

let simulations = [];

addEventListener("DOMContentLoaded", () => {
    //Setting framebuffer
    let framebuffer = document.getElementById("framebuffer");
    framebuffer.width = window.innerWidth;
    framebuffer.height = window.innerHeight;

    //Adding event functions
});