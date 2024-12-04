
import React from 'react';

function Banner({userName, reservationItems})
{
    return (
        <h4 className="bg-danger text-white text-center p-2">
            { userName }
          - { reservationItems.filter(t => !t.done).length } Locations to Choose From
        </h4>
    );
}

export default Banner;
