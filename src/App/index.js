import React from 'react';
import { AppUI } from './AppUI';

const defaultTodos = [
  { text: 'Cortar cebolla', completed: true },
  { text: 'Tomar el curso de introduccion a React', completed: false },
  { text: 'Llorar con la llorona', completed: false }
];

function App() {
  const [todos, setTodos] = React.useState(defaultTodos);
  const [searchValue, setSearchValue] = React.useState(''); // el estado usa un array de searchValue y setSearchValue, es igual a un estado que es un array vacío. Esto se guarda en la constante searchValue, y setSearchValue cambia este estado, por tanto cambia searchValue

  const completedTodos = todos.filter(todo => !!todo.completed).length; // filtra nuestros todo y mira si tiene completed como true gracias a !!
  const totalTodos = todos.length;

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
    setTodos(newTodos); //vamos a actualizar el estado de todos para que sea igual a newTodos
  };

  const deleteTodo = (text) => {
    const todoIndex = todos.findIndex(todo => todo.text === text); // va a buscarnos el índice del todo cuyo texto coincide con el texto aportado a la funcion
    const newTodos = [...todos]; // vamos a clonar la lista de todos (eso es con el ...)
    newTodos.splice(todoIndex, 1); // de esta lista clonada el que tiene el texto coincidente va a ser eliminado
    setTodos(newTodos); //vamos a actualizar el estado de todos para que sea igual a newTodos
  };

  return (
    <AppUI
      totalTodos={totalTodos}
      completedTodos={completedTodos}
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      searchedTodos={searchedTodos}
      completeTodo={completeTodo}
      deleteTodo={deleteTodo}
    />
  );
}

export default App;
