/*
    Note:
    slice(x, y) -> returns string object from x position to y (not included) and negatives are counted from the end of the string
    substring() -> same but negatives are counted as zero
    substr() -> same as slice() but the second parameter is the length of the slice

    replace("WhatToFind", "WhatToPut") -> Does not change the string, it creates a new one
    Note:
    To make the function not case sensitive: /SoMeThInG/i (Use this plus sufix /i)
    To replace all matches: /Something/g
    Or can use replaceAll(); XD

    Note:
    Exists toUpperCase() and toLowerCase() and str.concat() does not modify the actual string
    trim() removes spaces
*/

const person = {
    firstName: "John",
    secondName: "Doe",
    fullName: function() { return this.firstName + " " + this.secondName; }
}

let click_state = false;

//Note: Js objects (not literals) cannot be compared, always false
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