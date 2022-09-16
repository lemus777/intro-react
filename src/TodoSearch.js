import React from 'react';
import './TodoSearch.css';

function TodoSearch() {
    const [searchValue, setSearchValue] = React.useState(''); // el estado usa un array de searchValue y setSearchValue, es igual a un estado que es un array vacío. Esto se guarda en la constante searchValue, y setSearchValue cambia este estado, por tanto cambia searchValue

    const onSearchValueChange = (event) => {
        console.log(event.target.value); 
        setSearchValue(event.target.value); // Event target value guarda la información introducida por el usuario en el campo, así que cambiará el searchValue a eso
    };

    return [
        <input 
            className='TodoSearch'
            placeholder='Cebolla'
            value={searchValue} // tenemos que aplicar un valor inicial al estado que será el searchValue de la constante
            onChange={onSearchValueChange} // en cuanto cambie usamos setSearchValue para cambiar el estado
        />,
        <p>{searchValue}</p>
    ];
}

export { TodoSearch };