import React from 'react';
import { AppUI } from './AppUI';

//const defaultTodos = [
//  { text: 'Cortar cebolla', completed: true },
//  { text: 'Tomar el curso de introduccion a React', completed: false },
//  { text: 'Llorar con la llorona', completed: false }
//];

function App() {
  // persistencia
  const localStorageTodos = localStorage.getItem('TODOS_V1'); // localStorage.getItem recupera lo guardado en el navegador (localStorage).
  let parsedTodos;

  if (!localStorageTodos) {
    localStorage.setItem('TODOS_V1', JSON.stringify([])); // si no hay localStorageTodos generamos uno por defecto que será un array vacío transformado a texto (JSON.stringify) para que localStorage pueda guardarlo
    parsedTodos = []; // además necesitamos un parsedTodos, que será un array vacío también
  } else {
    parsedTodos =JSON.parse(localStorageTodos); // como tenemos un localStorage, que siempre es texto, lo pasamos a array (JSON.parse) y lo usamos como parsedTodos
  }
  // fin persistencia

  const [todos, setTodos] = React.useState(parsedTodos);
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

  const saveTodos = (newTodos) => { // funcion para actualizar estado con persistencia
    const stringifiedTodos = JSON.stringify(newTodos); // convierte newTodos a texto (newTodos se genera en los métodos para completar y eliminar, mas abajo)
    localStorage.setItem('TODOS_V1', stringifiedTodos); // guarda en localStorage como item TODOS_V1 el texto generado anteriormente
    setTodos(newTodos); // actualiza el estado de Todos igualándolo a newTodos
  };

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
