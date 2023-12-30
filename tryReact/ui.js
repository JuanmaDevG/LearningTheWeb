import { react } from 'react';

//Rect components start with a capital letter
function DefaultButton()
{
    return (
        <button>Default button</button>
    );
}

//I can nest components into the return
export default function divWithDefButton()
{
    return (
        <div>
            <h1>This won't be displayed, just learning react</h1>
            <DefaultButton />
        </div>
    );
}

function returnMultipleComponents()
{
    let user = {
        name: "Juan", 
        age: 21
    };
    return (
        <>
            <h1 className='new-font'>Web with react goes brrrrr</h1>
            <p> I am { user.name } </p>
            <DefaultButton />
        </>
    );
}