import React from 'react';

function Row({item, toggle})
{

    const onToggle = () => {
        toggle(item);
    };

    return (
        <tr>
            <td>
                { item.action }
            </td>
            <td>
                <input
                    type="checkbox"
                    checked={ item.done }
                    onChange={ onToggle }
                    />
            </td>
        </tr>
    );
}

export default Row;