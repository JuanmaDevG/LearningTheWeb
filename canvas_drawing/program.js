//TODO: onclick functions that empty the screen to pass to another function
function clean(framebuffer, context)
{
    context.clearRect(0, 0, framebuffer.width, framebuffer.height);
}


/*
    Get screen size, context and set width and height
*/

framebuffer = document.getElementById("framebuffer");
ctx = framebuffer.getContext("2d");

framebuffer.width = window.screen.availWidth;
framebuffer.height = window.screen.availHeight;