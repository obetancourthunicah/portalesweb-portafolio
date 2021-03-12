import {useState, useEffect} from 'react';

import NewTodo from "./NewTodo";
import TodoList from "./TodoList";
import "./TodoList.css";

import firebaseSDK from '../../../FireBaseInit';

function Todo(){
  const [todoData, setTodoData] = useState({
    todos:[],
    newTodo:"",
    waiting:false
  });

  useEffect(
    ()=>{
      const todosRef = firebaseSDK.database().ref('todos').orderByKey().limitToLast(100);
      todosRef.on('child_added', (snapshot) => {
        let newTodo = { ...snapshot.val(), fb_id: snapshot.key };
        let newTodos = todoData.todos;
        newTodos.push(newTodo);
        setTodoData({...todoData, todos: newTodos});
      });
      todosRef.on('child_removed', (snapshot)=>{
        const deletedKey = snapshot.key;
        let newTodos = todoData.todos.filter(o=>{
          return o.fb_id !==deletedKey;
        });
        setTodoData({ ...todoData, todos: newTodos });
      });
      todosRef.on('child_changed', (snapshot) => {
        const changedKey = snapshot.key;
        const data = snapshot.val();
        console.log(data);
        let newTodos = todoData.todos.map(o => {
          if (o.fb_id == changedKey) {
            o = {...data, fb_id:changedKey};
          }
          return o;
        });
        setTodoData({ ...todoData, todos: newTodos });
      });
      return ()=>{
        todosRef.off();
      }
    },
    []
  );

  const onChange = (e)=>{
    const {name, value} = e.currentTarget;
    setTodoData({...todoData, newTodo: value});
  };
  const onAddNew = (e)=>{
    let newToo = {
      description: todoData.newTodo,
      completed:false,
      id : new Date().getTime()
    };
    firebaseSDK.database().ref("todos").push(newToo);
    /*let newTodos = todoData.todos;
    newTodos.push(newToo);

    setTodoData({todos:newTodos, newTodo: ""});
    */
  }
  const doneHandler = (id)=>{
    const ref = firebaseSDK.database().ref("todos")
    const fbTodo = ref.child(id);
    const lcTodo = todoData.todos.find( (o)=>{
      return o.fb_id === id;
    });
    fbTodo.update({
      "completed": !lcTodo.completed
    });
    // const newTodos = todoData.todos.map((o)=>{
    //   if(o.id == id){
    //     o.completed = !o.completed;
    //   }
    //   return o;
    // });

    // setTodoData({...todoData, todos:newTodos});
  };
  const deleteHandler = (id)=>{
    const ref = firebaseSDK.database().ref("todos")
    const fbTodo = ref.child(id);
    const lcTodo = todoData.todos.find((o) => {
      return o.fb_id === id;
    });
    fbTodo.remove();
    // const newTodos = todoData.todos.filter((o) => {
    //   return o.id !==id;
    // });

    // setTodoData({ ...todoData, todos: newTodos });
  }
  // const tmpTodos = todoData.todos.map( (o)=>{return JSON.stringify(o)} ).join(" | ");
  return (
    <section>
     <NewTodo
      onChange={onChange}
      value={todoData.newTodo}
      onAddNew={onAddNew}
     >
     </NewTodo>
      <TodoList 
        todos={todoData.todos}
        doneHandler={doneHandler}
        deleteHandler={deleteHandler}
      ></TodoList>
    </section>
  )
}

export default Todo;
