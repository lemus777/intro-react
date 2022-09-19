import React from 'react';
import './CreateTodoButton.css';

function CreateTodoButton(props) {
    const onClickButton = (msg) => {
        alert(msg);
    }

    return (
        <button 
            className='CreateTodoButton'
            onClick={() => onClickButton('Aquí se debería abrir el modal')} /*en este tipo de eventos siempre tiene que ir una función, por eso la constante onClickButton es una función. Pero como queremos meter un argumento lo llamamos de nuevo como función para poder declararlo*/
        >
            +
        </button>
    );
}

export { CreateTodoButton };