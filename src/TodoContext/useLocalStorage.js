import React from "react";

function useLocalStorage(itemName, initialValue) {
    const [error, setError] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [item, setItem] = React.useState(initialValue);
  
    React.useEffect(() => {
      setTimeout(() => {
        // controla la persistencia, es un react hook
        try {
          const localStorageItem = localStorage.getItem(itemName); // localStorage.getItem recupera lo guardado en el navegador (localStorage).
          let parsedItem;
  
          if (!localStorageItem) {
            localStorage.setItem(itemName, JSON.stringify(initialValue)); // si no hay localStorageItem generamos uno por defecto que será un array vacío transformado a texto (JSON.stringify) para que localStorage pueda guardarlo
            parsedItem = initialValue; // además necesitamos un parsedItem, que será un array vacío también
          } else {
            parsedItem =JSON.parse(localStorageItem); // como tenemos un localStorage, que siempre es texto, lo pasamos a array (JSON.parse) y lo usamos como parsedItem
          }
  
          setItem(parsedItem);
          setLoading(false);
        } catch(error) {
          setError(error);
        }
      }, 1000);
    });
  
    const saveItem = (newItem) => { // funcion para actualizar estado con persistencia
      try {
        const stringifiedItem = JSON.stringify(newItem); // convierte newItem a texto (newItem se genera en los métodos para completar y eliminar, mas abajo)
        localStorage.setItem(itemName, stringifiedItem); // guarda en localStorage como item Item_V1 el texto generado anteriormente
        setItem(newItem); // actualiza el estado de Item igualándolo a newItem
      } catch(error) {
        setError(error);
      }
    };
  
    return {
      item,
      saveItem,
      loading,
      error,
    }; // tenemos que usar return para que cuando la funcion App llame a esta funcion (useLocalStorage) le devuelva los dos valores que necesita, y también devuelve información de si está cargando o de si hay algún error
  }

  export { useLocalStorage };