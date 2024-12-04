import React, { useState } from 'react';

function Creator({callback})
{

    const [newItemText, setNewItemText] = useState("");

    const updateNewTextValue = (event) => {
        setNewItemText(event.target.value);
    };

    const createNewReservations = () => {
        if(newItemText !== "")
        {
            callback(newItemText);
            setNewItemText("");
        }
    }    

    return (
        <div className="container my-1">
            <input
                className="form-control"
                value={ newItemText }
                onChange={ updateNewTextValue }
                />
            <button className="btn btn-danger mt-1" onClick={ createNewReservations }>
                Add Location
            </button>
        </div>
    );
}

export default Creator;