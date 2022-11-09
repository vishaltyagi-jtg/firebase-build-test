import {useState, useEffect} from 'react';
import './App.css';
import ITodo from './types';
import fiestoreServices from './fiestoreServices';

function App() {

  const  [todos, setTodos] = useState<Array<ITodo>>([]);
  const [input, setInput] = useState('');
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    fetchAllTodo();

  }, [])
  
  const fetchAllTodo = async() => {
    setLoader(true);
    const response = await fiestoreServices.getAll();
    const _todos: ITodo[] = [];
    response.forEach((todo) => {
      const data = todo.data();
      _todos.push({message: data.message, id: data.id, documentId: todo.id});
    })
    setTodos(_todos);
    setLoader(false);
  }

  const handleDelete = async (id: string) => {
    setLoader(true);
    await fiestoreServices.delete(id);
    setTodos(todos.filter((todo) => todo.documentId !== id));
    setLoader(false);
  }
  
  const handleAdd = async () => {
    const id = new Date().toISOString();
    const todo = {message: input, id, documentId: ''};
    setLoader(true);
    setInput('');
    const response =  await fiestoreServices.create({message: todo.message, id: todo.id});
    todo.documentId = response.id;
    setLoader(false);
    setTodos([...todos].concat(todo));
  }


  return (
    <div className="App">
    <div>
    <header className="App-header">
        <h1>Todo</h1>
      </header>
      <main>
        <div>
          <input type="text" value={input} onChange={(event) => setInput(event.target.value)} />
          <button onClick={handleAdd}>Add</button>
        </div>
        {loader && <p>Loading....</p>}
        {todos.map((todo) => <p key={todo.id}>{todo.message} <button onClick={() => handleDelete(todo.documentId)}>X</button></p>)}
      </main>
    </div>
    </div>
  );
}

export default App;
