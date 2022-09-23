import React from 'react';
import ReactDOM from 'react-dom/client';
import { createPortal } from 'react-dom'; // Atención, esto ha cambiado, necesitamos importar esto para crear portales
import './Modal.css';

function Modal({ children }) {
    return createPortal( // Y el portal se llama así, no con ReactDOM.createPortal
        <div className='ModalBackground'>
            {children}
        </div>,
        document.getElementById('modal')
    )
}

export { Modal };