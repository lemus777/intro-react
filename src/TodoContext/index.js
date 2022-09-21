import React from "react";
import { useLocalStorage } from './useLocalStorage';

const TodoContext = React.createContext();

function TodoProvider(props) {
    const {
        item: todos,
        saveItem: saveTodos,
        loading,
        error,
      } = useLocalStorage('TODOS_V1', []); //llamamos a nuestro custom hook
      const [searchValue, setSearchValue] = React.useState(''); // el estado usa un array de searchValue y setSearchValue, es igual a un estado que es un array vacío. Esto se guarda en la constante searchValue, y setSearchValue cambia este estado, por tanto cambia searchValue
    
      const completedTodos = todos.filter(todo => !!todo.completed).length; // filtra nuestros todo y mira si tiene completed como true gracias a !!
      const totalTodos = todos.length; // totalTodos nos da el número total de todos que tenemos
    
      let searchedTodos = []; // nos crea searchedTodos que va a ser un array vacio
    
      if (!searchValue.length >= 1) {
        searchedTodos = todos; // si no hay al menos una letra de búsqueda iguala el array a nuestro todos, que por defecto es defaultTodos
      } else {
        searchedTodos = todos.filter(todo => { // si hay algo en la búsqueda por cada todo:
          const todoText = todo.text.toLowerCase(); // nos pasa a minúsculas el texto de todo
          const searchText = searchValue.toLowerCase(); // nos pasa a minúsculas el texto de la búsqueda
          return todoText.includes(searchText); // nos devuelte los todos cuyo texto incluye la búsqueda, al ser pasado a minúsculas nos lo va a encontrar independientemente de que se busque en mayúsculas o minúsculas
        });
      }
    
      const completeTodo = (text) => {
        const todoIndex = todos.findIndex(todo => todo.text === text); // va a buscarnos el índice del todo cuyo texto coincide con el texto aportado a la funcion
        const newTodos = [...todos]; // vamos a clonar la lista de todos (eso es con el ...)
        newTodos[todoIndex].completed = true; // de esta lista clonada el que tiene el texto coincidente va a ser marcado como completado
        saveTodos(newTodos); //vamos a actualizar el estado de todos para que sea igual a newTodos y a la vez guarda para persistencia, ver la función más arriba
      };
    
      const deleteTodo = (text) => {
        const todoIndex = todos.findIndex(todo => todo.text === text); // va a buscarnos el índice del todo cuyo texto coincide con el texto aportado a la funcion
        const newTodos = [...todos]; // vamos a clonar la lista de todos (eso es con el ...)
        newTodos.splice(todoIndex, 1); // de esta lista clonada el que tiene el texto coincidente va a ser eliminado
        saveTodos(newTodos); //vamos a actualizar el estado de todos para que sea igual a newTodos
      };

    return(
        <TodoContext.Provider value={{ // el provider provee de todas las propiedades que necesitan consumir nuestros componentes
            loading,
            error,
            totalTodos,
            completedTodos,
            searchValue,
            setSearchValue,
            searchedTodos,
            completeTodo,
            deleteTodo,
        }}>
            {props.children}
        </TodoContext.Provider>
    );
}

export { TodoContext, TodoProvider };