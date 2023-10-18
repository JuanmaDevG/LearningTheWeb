let click_state = false;

function surprise_button_click()
{
    if(!click_state)
    {
        document.getElementById("surprise-paragraph").innerHTML = "IT JUST WORKS FINE !!!";
        click_state = true;
    }
    else
    {
        document.getElementById("surprise-paragraph").innerHTML = "And you click it again and then...";
        click_state = false;
    }
}