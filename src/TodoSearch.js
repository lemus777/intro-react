import React from 'react';
import './TodoSearch.css';

function TodoSearch() {
    const onSearchValueChange = (event) => {
        console.log(event.target.value); // Event target value guarda la información introducida por el usuario en el campo
    };

    return (
        <input 
            className='TodoSearch'
            placeholder='Cebolla'
            onChange={onSearchValueChange}
        />
    );
}

export { TodoSearch };